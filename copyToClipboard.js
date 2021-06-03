const fs = require("fs");
const exec = require("child_process").exec;
const iconv = require("iconv-lite");

function copyToClipboard(content) {
  content = iconv.encode(content, "gbk");
  let resultfileName = "result.txt";
  let command = `clip < ${resultfileName} `;
  fs.writeFileSync(resultfileName, content);

  var cmdFileName = "copy.bat";
  fs.writeFileSync(cmdFileName, command);
  exec(cmdFileName, function (err, stdout, stderr) {
    if (err || stderr) return console.log(err, stdout, stderr);
    fs.unlinkSync(cmdFileName);
    fs.unlinkSync(resultfileName);
    console.log("已复制到剪贴板!");
  });
}

module.exports = copyToClipboard;
