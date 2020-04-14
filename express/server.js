'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const feeds = require('../feeds.json');
var query = [];
const router = express.Router();
router.get('/test', (req, res)=>{
    //console.log('feeds.length', feeds.length);
    res.json({ now: new Date() })
});
router.get('/', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    //console.log(req.path);
    //console.log(JSON.stringify(req.query));
    var startDate = new Date();
    startDate.setDate(startDate.getDate()-30);
    if(req.query.start){
        //console.log('start defined');
        startDate = new Date(req.query.start);
    }
    var endDate = new Date(startDate.toISOString());
    endDate.setDate(startDate.getDate()+30);
    if(req.query.end){
        //console.log('end defined');
        endDate = new Date(req.query.end);
    }
    //console.log('startDate', startDate);
    //console.log('endDate', endDate)
    var filteredFeeds = feeds.filter(function (feed) {
        var feedDate = new Date(feed.date);
        var feedDateBeforeEnd = feedDate<=endDate;
        var feedDateAfterStart = feedDate>=startDate;
        //console.log('feed', feed.site, feed.title.substring(0,10), 'feedDate', feedDate, 'afterStart', feedDateAfterStart, 'beforeEnd', feedDateBeforeEnd);
        if (feedDateBeforeEnd && feedDateAfterStart) {
            return true;
        } else {
            return false;
        }
    });
    if(req.query.site){
        var site = req.query.site || '';
        site = site.toLowerCase();
        filteredFeeds = filteredFeeds.filter(function(feed){
            if(feed.site.toLowerCase() == site){
                //console.log('returning true');
                return true;
            } else {
                return false;
            }
        });
        //console.log('filteredFeeds.length', filteredFeeds.length);
    }
    if(req.query.author){
        var author = req.query.author || '';
        filteredFeeds = filteredFeeds.filter(function(feed){
            if(feed.author.toLowerCase() == author.toLowerCase()){
                return true;
            } else {
                return false;
            }
        });
    }
    if(req.query.text){
        var text = req.query.text.toLowerCase() || '';
        filteredFeeds = filteredFeeds.filter(function(feed){
            if(feed.site.toLowerCase().indexOf(text) >-1 ||
               feed.category.toLowerCase().indexOf(text) >-1 ||
               feed.title.toLowerCase().indexOf(text) >-1 ||
               feed.author.toLowerCase().indexOf(text) >-1){
                return true;
            } else {
                return false;
            }
        });
    }
    filteredFeeds.sort(function(a,b){
        var adate = new Date(a.date);
        var bdate = new Date(b.date);
        return bdate - adate;
      })

    var obj = {
        queryGiven: req.query,
        queryUsed: {
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
            url: "/.netlify/functions/server?start=" + startDate.toISOString().split('T')[0] + "&end=" + endDate.toISOString().split('T')[0]
        },
        //feeds: feeds,
        filteredFeeds: filteredFeeds
    }
    if(req.query.text){
        obj.queryUsed.text = req.query.text.toLowerCase();
        obj.queryUsed.url += "&text=" +req.query.text.toLowerCase();
    }
    console.log(obj.queryUsed.url, '=>', filteredFeeds.length);
    res.write(JSON.stringify(obj));
    res.end();
});
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);