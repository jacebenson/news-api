let dataFeeds = require('../src/_data/feeds.js')
let feeds = dataFeeds.sources;
module.exports = {
    build: function (file, callback) {
        let Parser = require('rss-parser');
        let parser = new Parser();
        const fs = require('fs');
        let feedPath = file;
        
        var outputObj = {
            feeds: [],
            news: []
        };
        var promises = [];
        feeds.forEach(function (rssFeed) {
          try{
            //let promise = await parser.parseURL('https://www.reddit.com/.rss');
            var promise = parser.parseURL(rssFeed.url, (error, feed) => {
                outputObj.feeds.push(rssFeed.title);
                console.log(outputObj.feeds.length, '/', feeds.length, rssFeed.title);
                //console.log(feed.items.length>0);
                if(typeof feed != "undefined" ){
                feed.items.forEach(function (item) {
                    var forceUpdateDate = item.isoDate.replace('0Z', '1Z');
                    var link = item.link;
                    if(!item.link && item.enclosure){
                        link = item.enclosure.url;
                    }
                    console.log(rssFeed);
                    outputObj.news.push({
                        date: forceUpdateDate,//item.isoDate,
                        site: rssFeed.title,
                        category: rssFeed.type,
                        title: item.title,
                        link: link,
                        author: rssFeed.authors.join(',')//item.author || 
                    });
                    //console.log(item);
                    //console.log(item.title + ':' + item.link);
                    // modify title to filename
                    // prepend domain to filename
                    //var filename = title.replace//all the non-a-z0 w/_
                    //console.log(JSON.stringify(item,'',' '));
                });
            }
                if (outputObj.feeds.length === feeds.length) {
                    console.log('all feeds loaded, writing to feeds.json', outputObj.news.length);
                    fs.exists(feedPath, function (exists) {
                        if (exists) {//overwrite
                            console.log('updating feeds.json')
                            fs.readFile(feedPath, (err, data) => {
                                if (err) {
                                    throw err;
                                }
                                //console.log(data);
                                var tempData = JSON.parse(data);
                                var newArr = tempData.concat(outputObj.news);
                                var uniqueArray = newArr.filter(function (item, pos) {
                                    return newArr.indexOf(item) == pos;
                                })
                                uniqueArray.sort(function (a, b) {
                                    var aDate = new Date(a.date);
                                    var bDate = new Date(b.date);
                                    return bDate - aDate;
                                })
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
                            });

                            callback();
                        } else {//create
                            console.log('creating feeds.json')
                            fs.writeFileSync(feedPath, JSON.stringify(outputObj.news, '', ' '));

                            callback();
                        }
                    });

                }
            });
            promises.push(promise);
          }catch(e){
              console.error("Error", e)
            }
        });
    }

};
