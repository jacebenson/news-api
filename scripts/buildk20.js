module.exports = {
  build: function (callbackFinal) {
    var fs = require("fs");
    var outputArr = [];
    let feedPath = "./feeds.json"
    let k20Path = "./k20temp.json"
    var k20Data = JSON.parse(fs.readFileSync(k20Path, 'utf8'));
    var feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
    console.log('k20Data.length', k20Data.length);
    console.log('feedData.length', feedData.length);
    //console.log(data);
    var newArr = feedData.concat(k20Data);
    console.log('newArr.length', newArr.length);
  
    var uniqueArray = newArr.filter(function (item, pos) {
      return newArr.indexOf(item) == pos;
    })
    uniqueArray.sort(function (a, b) {
      var adate = new Date(a.date);
      var bdate = new Date(b.date);
      return bdate - adate;
    });

    uniqueArray = (function () {
      var arr = uniqueArray;
      var comp = 'link';
      const unique = arr
        .map(e => e[comp])
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);
      return unique;
    })();
    var now = new Date();
    now.setDate(now.getDate() + 5);
    var notFuture = uniqueArray.filter(function (result) {
      var resultDate = new Date(result.date);
      if (resultDate < now) {
        return true;
      } else {
        return false;
      }
    });
    console.log('notFuture.length', notFuture.length)
    fs.writeFileSync(feedPath, JSON.stringify(notFuture, '', ' '));
    callbackFinal();
    //});
  }
}

