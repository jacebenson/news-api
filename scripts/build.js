var fs = require('fs');

let feedPath = "./rawfeeds.json"

fs.writeFile(feedPath, '[]', {flag:'w' }, function(err){
    if(err) throw err;
    console.log('file saved');
})
var rssFeeds = require('./buildnews');
var communityBlogs = require('./buildsnblogs');

var javiera = require('./buildsnjaviera');
var markr = require('./buildsnmarkr');

    rssFeeds.build(function(){
        console.log('rss feeds built');
        
            javiera.build(function(){
                console.log('getting javiera\'s posts');
                markr.build(function(){
                    console.log('getting markr\'s posts');
                    communityBlogs.build(function(){
                        console.log('community blogs built');
                    })
                })
            })
        
    });
module.exports = {
    
        

};