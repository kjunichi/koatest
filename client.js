var ipc = require('ipc');
var fs = require('fs');

var uploadFilePath="";

var btn = document.getElementById("uploadBtn");
btn.addEventListener("click", function() {
  // 選択されたファイルをアップロードする
  alert("upload = " + uploadFilePath);
  if (uploadFilePath == "") {
    return;
  }

  var req = new XMLHttpRequest();
  //console.dir(req);
  req.open("POST", "http://localhost:3000/", true);
  req.onreadystatechange = function() {
    //readyState値は4で受信完了
    if (req.readyState == 4) {
      //コールバック
      //on_loaded(http);
      console.log("responseText" + req.responseText);
    }
  };
  //req.setRequestHeader("Content-Type","multipart/form-data");
  var formData = new FormData();
  console.log("1 uploadFilePath = "+ uploadFilePath[0].split("/").slice(-1));

  var data = fs.readFileSync(uploadFilePath[0]);
  //var data = fs.readFileSync('/Users/kjw_junichi/Dropbox/work/201308062108.jpg');
  var oFileBody = '<a id="a"><b id="b">hey!</b></a>'; // 新しいファイルのボディ...
var oBlob = new Blob([oFileBody], { type: "text/xml"});

  formData.append("theFile",oBlob);
  console.dir(formData);
  req.send(formData);
});

ipc.on('asynchronous-reply', function(arg) {
  console.dir(arg);
  uploadFilePath = arg;
  console.log("fileName = " + uploadFilePath);

});
var fileOpenBtn = document.getElementById("fileOpenBtn");
fileOpenBtn.addEventListener("click", function() {
  ipc.sendSync('openFileDialog');
});
