var fs = require('fs');

let feedPath = "./rawfeeds.json"

fs.writeFile(feedPath, '[]', { flag: 'w' }, function (err) {
    if (err) throw err;
    console.log('file saved');
});
var rssFeeds = require('./buildnews');
var communityBlogs = require('./buildsnblogs2');
var communityArticles = require('./buildsnarticles');
var communityVideos = require('./buildsnvideos');

rssFeeds.build(function () {
    console.log('rss feeds built');
    communityArticles.build(function(){
        console.log('community articles built');
        communityBlogs.build(function () {
            console.log('community blogs built');
            communityVideos.build(function () {
                console.log('community videos built');
            });
        });
    });
});


module.exports = {};