#!/usr/bin/env python
#coding=utf-8

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from os.path import join, dirname, abspath

DICT_FILE = join(dirname(abspath(__file__)), 'SogouLabDic.dic')
WORDS_V1_JS = join(dirname(abspath(__file__)), 'words.v1.js')
WORDS_V2_JS = join(dirname(abspath(__file__)), 'words.v2.js')

def getwords(file_name):
    words = []
    with open(file_name) as f:
        for line in f:
            tokens = line.split("\t")
            word = tokens[0]
            freq = tokens[1]
            if freq < 100: # 剔除低频词
                continue
            words.append(word.decode("GB18030"))
    return words

def generate_words_v2():
    words = getwords(DICT_FILE)
    words = sorted(words)
    output_lines = []
    last_pref = ''
    output_line = []
    for word in words:
        pref = word[0]
        if last_pref == '':
            output_line = [word]
            last_pref = pref
        elif last_pref == pref:
            output_line.append(word)
        elif last_pref != pref:
            output_lines.append(output_line)
            output_line = [word]
            last_pref = pref
    with open(WORDS_V2_JS, 'w') as f:
        f.write('var words_v2=\'')
        for line in output_lines:
            l = sorted(line, cmp=lambda x, y :cmp(len(x), len(y)))
            basechar = l[0][0]
            length = len(l[0])
            output = [basechar, str(length - 1)]
            for word in l:
                if len(word) != length:
                    length = len(word)
                    output.append(str(length - 1))
                output.append(word[1:])
            f.write(''.join(output) + '$')
        f.write('\';')

def generate_words_v1():
    words = getwords(DICT_FILE)
    text = ','.join(["'" + w + "'" for w in words])
    text = 'var words_v1=[' + text + "];"
    with open(WORDS_V1_JS, 'w') as js:
        js.write(text)

generate_words_v2()
