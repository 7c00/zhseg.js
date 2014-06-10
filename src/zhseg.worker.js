// zhseg.js
importScripts("../dict/words.v2.js");
importScripts("../src/trie.js");
importScripts("../src/zhseg.js");

var decompress_words_v2 = function(){
    var words = [];
    words_v2.split('$').forEach(function(e, i){
        var basechar = e[0];
        var cursor = 1;
        var length = 0;
        while(cursor < e.length){
            var ch = e.charAt(cursor);
            if(ch >= '0' && ch <= '9'){
                length = 0;
                do{
                    length = length * 10 + parseInt(ch);
                    cursor += 1;
                    ch = e.charAt(cursor);
                }while(ch >= '0' && ch <= '9');
            }

            var suf = e.substr(cursor, length);
            words.push(basechar + suf);
            cursor += length;
        }
    });
    console.log(words);
    return words;
};

var onmessage = function(event) {
    if(event.data.type == 'req_init'){
        var btime = (new Date()).getTime();
        var trie = new Trie();
        var words = decompress_words_v2();
        words.forEach(function(e, i){
            trie.add(e);
        });
        var etime = (new Date()).getTime();
        console.log("加载字典用时: " + (etime - btime) +" ms.");
        zhseg.init(trie);
        postMessage({
            'type' : 'res_init',
            'status' : 'done'
        });
    } else if(event.data.type == 'req_seg'){
        var text = event.data.text;
        var list = zhseg.seg(text);
        postMessage({
            'type' : 'res_seg',
            'status' : 'done',
            'result' : list
        });
    }
}

