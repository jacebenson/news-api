var fs = require('fs');

let feedPath = "./src/_data/rawfeeds.json"

fs.writeFile(feedPath, '[]', { flag: 'w' }, function (err) {
    if (err) throw err;
    console.log('file saved');
});
var rssFeeds = require('./buildnews');
var communityBlogs = require('./buildsnblogs2');
var communityArticles = require('./buildsnarticles');
var communityVideos = require('./buildsnvideos');

rssFeeds.build(feedPath, function () {
    console.log('rss feeds built');
    communityArticles.build(feedPath, function(){
        console.log('community articles built');
        communityBlogs.build(feedPath, function () {
            console.log('community blogs built');
            communityVideos.build(feedPath, function () {
                console.log('community videos built');
            });
        });
    });
});


module.exports = {};