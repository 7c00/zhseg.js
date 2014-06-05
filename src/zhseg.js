// zhseg.js

var zhseg = (function(){

    var DELIMS = " ~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./";
    DELIMS += "~！@#￥%……&*（）——+『』|：“《》？·-=【】、；‘，。/";
    DELIMS += "　～！＠＃￥％……＆＊（）——＋『』｜：”《》";
    DELIMS += "？·－＝【】、；’，。／";

    var trie = new Trie();

    var init = function(trie_instance){
        trie = trie_instance;
    };

    var seg = function(text){
        return frag(text, algo_fmm);
    };

    var TYPE_DEFAULT = 0;
    var TYPE_NUMBER  = 1;
    var TYPE_LETTER  = 2;
    var TYPE_DELIM   = 3;

    var frag = function(text, algo){
        var text_length = text.length;
        var window_begin = 0;
        var window_end = 0;
        var result = [];
        var ltype = undefined;
        var output_part = function(wbegin, wend){
            var part = text.substring(wbegin, wend);
            if(ltype == TYPE_DEFAULT && algo){
                algo(part).forEach(function(e,i){ result.push(e)});
            }else{
                result.push(part);
            }
        };
        while(window_end < text_length){
            var ch = text.charAt(window_end);
            var is_number = ch >= '0' && ch <= '9';
            var is_letter = (ch >= 'a' && ch <= 'z') ||
                (ch >= 'A' && ch <= 'Z');
            var is_delim = DELIMS.indexOf(ch) !== -1;

            var ctype = TYPE_DEFAULT;
            ctype = is_number ? TYPE_NUMBER : ctype;
            ctype = is_letter ? TYPE_LETTER : ctype;
            ctype = is_delim  ? TYPE_DELIM : ctype;

            if(ltype == undefined){
                ltype = ctype;
                window_end += 1;
            } else if(ltype == ctype){
                window_end += 1;
            } else if(ltype != ctype){
                output_part(window_begin, window_end);
                ltype = ctype;
                window_begin = window_end;
                window_end += 1;
            }

            if(window_end == text_length){
                output_part(window_begin, window_end);
                break;
            }
        }
        return result;
    };

    var algo_fmm = function(part){
        var result = [];
        var part_length = part.length;
        var window_begin = 0;
        var window_end = 0;
        // var tr = null;
        while(window_end < part_length){
            var ch = part.charAt(window_end);
            var t = trie.find(ch);
            while(t != null && window_end < part_length){
                window_end += 1;
                ch = part.charAt(window_end);
                t = t.find(ch);
            }
            result.push(part.substring(window_begin, window_end));
            window_begin = window_end;
        }
        return result;
    }

    return {
        // trie : trie,
        init : init,
        seg : seg
    };
})();
