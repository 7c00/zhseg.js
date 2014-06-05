// test.js

window.onload = function() {
    var div = document.getElementById("log");
    var log = function(msg) {
        div.appendChild(document.createTextNode(msg));
        div.appendChild(document.createElement("br"));
    }

    var text="第一个实用Akka集群的项目，轻视了。好在兄弟们这几天努力改进，希望能渐渐稳定并对性能和架构加以验证。这个系统的架构和设计是考虑了渐近进化的，如果成立，可以一点一点地放大和载入需求。手上的另一个小项则与它相得益彰。希望思考和设计能带来相应的果。#往前走#";

    // 加载字典
    var worker = new Worker("../src/zhseg.worker.js");
    worker.onmessage = function(event){
        if(event.data.type == 'res_init'){
            if(event.data.status == 'done'){
                log("字典加载完成。");
                log("测试分词:" + text);
                worker.postMessage({
                    'type' : 'req_seg',
                    'text' : text
                })
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

    log("开始加载字典 ... ");
    worker.postMessage({
        'type' : 'req_init'
    });
}
