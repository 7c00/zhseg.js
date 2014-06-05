// zhseg.js
importScripts("../dict/words.v1.js");
importScripts("../src/trie.js");
importScripts("../src/zhseg.js");

var onmessage = function(event) {
    if(event.data.type == 'req_init'){
        var btime = (new Date()).getTime();
        var trie = new Trie();
        words_v1.forEach(function(e, i){
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

