// test.js

window.onload = function() {

    // 字典是否加载
    var dict_loaded = false;

    // 显示页面日志信息
    var div = document.getElementById("log");
    var log = function(msg) {
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode(msg));
        div.appendChild(document.createElement("br"));
    }

    // Web Worker
    var worker = new Worker("../src/zhseg.worker.js");
    worker.onmessage = function(event){
        if(event.data.type == 'res_init'){
            if(event.data.status == 'done'){
                dict_loaded = true;
                load_dict_btn.textContent = "字典已加载";
                log("字典加载完成。");
            }
        } else if(event.data.type == 'res_seg'){
            if(event.data.status == 'done'){
                var result = event.data.result;
                log("分词结果:" + result.join("/"));
            }
        }
    };
    worker.onerror = function(error){
        log("加载字典出错: " + error.message + " .");
    };

    // 界面元素
    var load_dict_btn = document.getElementById("btn-load-dict");
    load_dict_btn.addEventListener('click', function(){
        load_dict_btn.disabled = true;
        load_dict_btn.textContent = "正在加载字典";
        log("开始加载字典。（可能需要一段时间）");
        worker.postMessage({
            'type' : 'req_init'
        });
    });
    var seg_text_btn = document.getElementById("btn-seg-text");
    var textarea = document.getElementById("text");
    seg_text_btn.addEventListener('click', function(){
        if(!dict_loaded){
            log("字典未加载");
            return;
        }
        log("分词:" + textarea.value);
        worker.postMessage({
            'type' : 'req_seg',
            'text' : textarea.value
        });
    });
}
