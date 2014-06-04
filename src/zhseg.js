// zhseg.js

var zhseg = (function(){

    var delims = " ~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./";
    delims += "~！@#￥%……&*（）——+『』|：“《》？·-=【】、；‘，。/";
    delims += "　～！＠＃￥％……＆＊（）——＋『』｜：”《》";
    delims += "？·－＝【】、；’，。／";

    var trie = new Trie();

    var init = function(words){
        words.forEach(function(e, i){
            trie.add(e);
        });
    };

    var seg = function(text){
        var result = [];
        var text_length = text.length;
        var sentence_begin = 0;
        var sentence_end = sentence_begin;

        while(sentence_end < text_length){
            var ch = text.charAt(sentence_end);
            if(delims.indexOf(ch) == -1){
                sentence_end += 1;
                continue;
            }
            var frag = text.substring(sentence_begin, sentence_end);

            // TODO process frag
            result.push(frag);
            result.push(ch);

            sentence_end += 1;
            sentence_begin = sentence_end;
        }
        return result;
    }

    var algo_fmm = function(text_frag){

    };

    return {
        // trie : trie,
        init : init,
        seg : seg
    };
})();
