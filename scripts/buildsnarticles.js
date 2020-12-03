module.exports = {
    build: function (callbackFinal) {
console.log('in buildsnarticles');
        var http = require("https");
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
        var fs = require("fs");
        var outputArr = [];
        let feedPath = "./feeds.json"
        // get count to start...
        var getNowArticles = function (start, callback) {
            if (!start) {
                start = 0;
            }
            var end = parseInt(start, 10) + 1000;
            var options = {
                method: "GET",
                hostname: "community.servicenow.com",
                //path: "/api/sn_communities/v1/community/contents?last=" + end + "&stFrom=" + start + "&before=" + new Date().toISOString() + "&forum=&type=5eaa334a5f10030069c587dc3f73130b&user=" + user + "&state=all&filters=undefined",
                path: "/api/sn_communities/v1/community/contents?last=" + end + "&stFrom=" + start + "&before=" + new Date().toISOString() + "&forum=&type=5eaa334a5f10030069c587dc3f73130b&sort=created&filters=undefined",
                headers: {
                    "Accept": "*/*",
                    "Cache-Control": "no-cache",
                    "Host": "community.servicenow.com",
                    //"Accept-Encoding": "gzip, deflate",
                    "Connection": "keep-alive",
                    "cache-control": "no-cache",
                    "content-type": 'application/json; charset=utf-8'
                }
            };
            //var recurseHttpRequest = function();

            var req = http.request(options, function (res) {
                var chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    var body = Buffer.concat(chunks);
                    //console.log(body.toString());
                    var responseObj = JSON.parse(body);

                    //console.log(responseObj.result.nextRecord, 'ServiceNow Community Articles - ' + user)

                    console.log((start, '/', responseObj.result.nextRecord), 'ServiceNow Articles')
                    responseObj.result.contents.forEach(function (post) {
                        var dateObj = new Date(post.published_date);
                        outputArr.push({
                            date: dateObj.toISOString(),
                            site: "ServiceNow Articles",
                            category: "Blog",
                            title: post.title,
                            author: post.userAvatarObject.name,
                            link: "https://community.servicenow.com/community?id=community_article&sys_id=" + post.sys_id
                        });
                    });

                    //if (responseObj.result.hasMoreRecords) {
                        /*getNowArticles(parseInt(responseObj.result.nextRecord, 10), function () {
                            console.log('outputArr.length', outputArr.length)
                        });*/
                    //} else {

                        fs.readFile(feedPath, (err, data) => {
                            if (err) {
                                throw err;
                            }
                            //console.log(data);
                            var tempData = JSON.parse(data);
                            var newArr = tempData.concat(outputArr);
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
                            fs.writeFileSync(feedPath, JSON.stringify(uniqueArray, '', ' '));
                            callbackFinal();
                        });
                    //}
                });
            });
            req.end();
        }
        //users.forEach(function(user){
            getNowArticles(null, null);
        //})
        
    }
}

