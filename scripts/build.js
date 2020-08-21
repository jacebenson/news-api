var fs = require('fs');

let feedPath = "./rawfeeds.json"

fs.writeFile(feedPath, '[]', { flag: 'w' }, function (err) {
    if (err) throw err;
    console.log('file saved');
});
var rssFeeds = require('./buildnews');
var communityBlogs = require('./buildsnblogs');
var communityArticles = require('./buildsnarticles');

rssFeeds.build(function () {
    console.log('rss feeds built');
    communityArticles.build(function(){
        console.log('community articles built');
        communityBlogs.build(function () {
            console.log('community blogs built');
        });
    });
    
});

module.exports = {};