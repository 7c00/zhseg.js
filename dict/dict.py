#!/usr/bin/env python
#coding=utf-8

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

def main():
    fn = 'SogouLabDic.dic'
    dict_file = open(fn)
    result = []
    for line in dict_file:
        tokens = line.split("\t")
        word = tokens[0]
        freq = int(tokens[1])
        if freq < 100 : # 剔除低频词
            continue
        result.append(word.decode("GB18030"))
    # text = json.dumps(result)
    text = ','.join(["'" + w + "'" for w in result])
    text = 'var words_v1=[' + text + "];"
    with open('words.v1.js', 'w') as js:
        js.write(text)
    dict_file.close()

main()
