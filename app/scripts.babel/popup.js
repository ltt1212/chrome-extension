'use strict';

console.log('\'Allo \'Allo! Popup');
$(document).ready(getCurrentTabUrl(getShortURL));

let [a, [b], c] = [1, [2, 3], 4];
console.log('a:' + a);
console.log('b:' + b);
console.log('c:' + c);



function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log('tab url', url);
    callback(url);
  });
}

function getShortURL(longURL) {
  $.ajax({
    url:'http://dwz.cn/create.php',
    type: 'post',
    data: 'url=' + longURL
  }).done(function (data) {
    var result = JSON.parse(data);
    var url = result.tinyurl;
    var status = result.status;
    if(status != 0){
      url = longURL;
      console.log(result.err_msg);
    }
    // var $qrCode = $('#qr-code');
    // new QRCode($qrCode[0], {
    //   text: url,
    //   width: 200,
    //   height: 200
    // });

    $('#qr-code').qrcode({
      text: url,
      width: 200,
      height: 200
    })

  });
}
