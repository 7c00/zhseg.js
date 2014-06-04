// test.js

window.onload = function() {
    var div = document.getElementById("log");
    var log = function(msg) {
        div.appendChild(document.createTextNode(msg));
        div.appendChild(document.createElement("br"));
    }

    // 加载字典
    var btime = (new Date()).getTime();
    zhseg.init(words_v1);
    var etime = (new Date()).getTime();
    log("字典加载时间：" + (etime - btime) + "ms;");

    // 分词
    var text="第一个实用Akka集群的项目，轻视了。好在兄弟们这几天努力改进，希望能渐渐稳定并对性能和架构加以验证。这个系统的架构和设计是考虑了渐近进化的，如果成立，可以一点一点地放大和载入需求。手上的另一个小项则与它相得益彰。希望思考和设计能带来相应的果。#往前走#";

    var result = zhseg.seg(text);
    log(result.join("/"));
}
