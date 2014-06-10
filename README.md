# zhseg.js

A browser-side Chinese word segmenter written in javascript. The forward maximum match (FMM) algorithm is implemented, and other algorithms might come later. Some HTML5 features, web worker for example, are used,  as well as some code from [mikedboer's trie](https://github.com/mikedeboer/trie). Test the project on http://t09def.github.io/zhseg.js/test/ with Chrome (latest versions are better, and other browsers are not tested).

To run the code on your own machine, Python 2.7.x is required, and then
```bash
# pull the code
git clone https://github.com/t09def/zhseg.js.git
# (optional) generate word.v2.js
python ./zhseg.js/dict/dict.py
# launch a local http server
python -m SimpleHTTPServer
# open http://localhost:8000/zhseg.js/test/ in your Chrome
```