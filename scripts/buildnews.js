module.exports = {
    build: function (callback) {
        let Parser = require('rss-parser');
        let parser = new Parser();
        const fs = require('fs');
        let feedPath = "./feeds.json"

        let feeds = 
        [
            {
              "title": "anerrantprogrammer.com",
              "type": "Blog",
              "url": "http://anerrantprogrammer.com/?feed=rss2",
              "authors": ["Sal Costa"]
            },
            {
              "title": "An Errant Programmer",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC2ey_HG743-CrxOTPU_ft7g",
              "authors": ["Sal Costa"]
            },
            {
              "title": "andrew.alburydor.com",
              "type": "Blog",
              "url": "https://andrew.alburydor.com/posts/index.xml",
              "authors": ["Andrew Albury-Dor"]
            },
            {
              "title": "Andrew Albury-Dor",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCH1byb2cbzlFrYndyKic_Lg",
              "authors": ["Andrew Albury-Dor"]
            },
            {
              "title": "Ben Hollifield",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCpXBKCVchJqXo08OyD0i2eQ",
              "authors": ["Ben Hollifield"]
            },
            {
              "title": "www.servicenowelite.com",
              "type": "Blog",
              "url": "http://www.servicenowelite.com/blog?format=rss",
              "authors": ["Mike Kaufman"]
            },
            {
              "title": "www.cloudminus89.com",
              "type": "Blog",
              "url": "http://www.cloudminus89.com/feeds/posts/default?alt=rss",
              "authors": ["Ruen Smith"]
            },
            {
              "title": "Code Creative",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCmwKZdMYyUD4AWnAIrx5JVw",
              "authors": ["Travis Toulson"]
            },
            {
              "title": "codecreative.io",
              "type": "Blog",
              "url": "https://codecreative.io/index.xml",
              "authors": ["Travis Toulson"]
            },
            {
              "title": "servicenow.implementation.blog",
              "type": "Blog",
              "url": "https://servicenow.implementation.blog/feed/",
              "authors": ["Shiva Thomas"]
            },
            {
              "title": "Göran Lundqvist",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCUJK90r6dnu-YXHyDOVIRww",
              "authors": ["Göran Lundqvist"]
            },
            {
              "title": "Mark Scott",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCysyuAe0q31GOOedkJja67Q",
              "authors": ["Mark Scott"]
            },
            {
              "title": "mavembry.info",
              "type": "Blog",
              "url": "https://mavembry.info/index.xml",
              "authors": ["Maverick Embry"]
            },
            {
              "title": "Robert, The Duke, Fedoruk",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCfhKNeCYiaJQaaKuACKt0Sg",
              "authors": ["Robert Fedoruk"]
            },
            {
              "title": "Robert, The Duke, Fedoruk",
              "type": "Podcast",
              "url": "https://anchor.fm/s/203322f8/podcast/rss",
              "authors": ["Robert Fedoruk"]
            },
            //
            {
              "title": "Break Point",
              "type": "Podcast",
              "url": "https://www.omnycontent.com/d/playlist/922e0f19-2d84-4485-835c-a83f00036b00/482f14e7-034f-4f55-a28a-abff01781da7/62c03853-0d6b-45ed-88ea-abff01797007/podcast.rss",
              "authors": ["Chuck Tomasi"]
            },
            {
              "title": "CJ & The Duke",
              "type": "Podcast",
              "url": "https://feeds.transistor.fm/cj-the-duke",
              "authors": ["Robert Fedoruk","Corey Wesley"]
            },
            {
              "title": "jace.pro",
              "type": "Blog",
              "url": "https://jace.pro/index.xml",
              "authors": ["Jace Benson"]
            },
            {
              "title": "ServiceNow Dev Program",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCdXorgCT87YlFRN9n8oJ7_A",
              "authors": ["Andrew Barnes","Brad Tilton","Chuck Tomasi"]
            },
            {
              "title": "developer.servicenow.com/blog.do",
              "type": "Blog",
              "url": "https://developer.servicenow.com/blog.do?p=/index.xml",
              "authors": ["Andrew Barnes","Brad Tilton"]
            },
            {
              "title": "servicenowgems.com",
              "type": "Blog",
              "url": "http://servicenowgems.com/feed",
              "authors": ["Ahmed Hmeid"]
            },
            {
              "title": "ServiceNow Community",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCBQU8mlFrElxQNR2mo-gLg",
              "authors": [""]
            },
            {
              "title": "ServiceNow Support",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCQjE37R-Y4DTq7kUWPO83Wg",
              "authors": ["ServiceNow"]
            },
            {
              "title": "ServiceNow TechBytes Podcast",
              "type": "Podcast",
              "url": "https://omny.fm/shows/servicenow-techbytes/playlists/podcast.rss",
              "authors": ["Steve Miller"]
            },
            {
              "title": "ServiceNow Community Podcasts",
              "type": "Podcast",
              "url": "https://omny.fm/shows/servicenow-cloudcast/playlists/servicenow-podcasts.rss",
              "authors": [""]
            },
            {
              "title": "servicenowthink.wordpress.com",
              "type": "Blog",
              "url": "https://servicenowthink.wordpress.com/feed",
              "authors": ["Aleksas Kucinskas"]
            },
            {
              "title": "Acorio - Candid Podcast",
              "type": "Podcast",
              "url": "https://feeds.buzzsprout.com/457558.rss",
              "authors": ["Devon Clarke"]
            },
            {
              "title": "finite-partners.com",
              "type": "Blog",
              "url": "https://finite-partners.com/feed",
              "authors": ["Garrett Griffin-Morales"]
            },
            {
              "title": "hiresumo.com/home",
              "type": "Blog",
              "url": "https://hiresumo.com/home?format=rss",
              "authors": [""]
            },
            {
              "title": "servicenowguru.com",
              "type": "Blog",
              "url": "https://www.servicenowguru.com/feed/",
              "authors": ["Mark Stanger"]
            },
            {
              "title": "www.covestic.com",
              "type": "Blog",
              "url": "https://www.covestic.com/feed/",
              "authors": [""]
            },
            {
              "title": "www.thinkahead.com/",
              "type": "Blog",
              "url": "https://www.thinkahead.com/feed",
              "authors": [""]
            },
            {
              "title": "aeritae.com",
              "type": "Blog",
              "url": "https://aeritae.com/blog/feed",
              "authors": [""]
            },
            {
              "title": "serviceportal.io",
              "type": "Blog",
              "url": "https://serviceportal.io/feed",
              "authors": ["Nathan Firth"]
            },
            {
              "title": "GlideFast",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCZNM56LyLhmba73FtDsyaAw",
              "authors": [""]
            },
            {
              "title": "ServiceSharp",
              "type": "Podcast",
              "url": "https://anchor.fm/s/a71217c/podcast/rss",
              "authors": ["Randy Haas","Jason Gibson"]
            },
            {
              "title": "workflow.servicenow.com",
              "type": "Newsletter",
              "url": "https://workflow.servicenow.com/feed/",
              "authors": [""]
            },
            {
              "title": "snprotips.com",
              "type": "Blog",
              "url": "https://snprotips.com/?format=rss",
              "authors": ["Tim Woodruff"]
            },
            {
              "title": "www.snc-blog.com",
              "type": "Blog",
              "url": "http://www.snc-blog.com/feed",
              "authors": [""]
            },
            {
              "title": "sncdevelopment.com",
              "type": "Blog",
              "url": "https://sncdevelopment.com/feed",
              "authors": ["James Naphen"]
            },
            {
              "title": "womennow.dev",
              "type": "Blog",
              "url": "https://womennow.dev/feed.xml",
              "authors": ["Paige"]
            },
            {
              "title": "pathwayscg.com",
              "type": "Blog",
              "url": "https://pathwayscg.com/feed/",
              "authors": ["Kaitlyn Giovinazzo"]
            },
            {
              "title": "Man Myth and Legend",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCT3ONLZwnTIfmVqRiDsRMVA",
              "authors": ["Lord Ryan Gillespie"]
            },
            {
              "title": "PhilGoesDeep",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCTmjY6H5roYkGQmwAQAcgQ",
              "authors": ["Phil Swann"]
            },
            {
              "title": "www.dylanlindgren.com",
              "type": "Blog",
              "url": "https://www.dylanlindgren.com/feed/",
              "authors": ["Dylan Lindgren"]
            },
            {
              "title": "ServiceNow Geek",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCKMW-HaQjgHvSG5CBCLHPA",
              "authors": ["Jeremy Duncan"]
            },
            {
              "title": "helpfultechblog.com",
              "type": "Blog",
              "url": "http://helpfultechblog.com/feed/",
              "authors": ["Phuong Nguyen"]
            },
            {
              "title": "medium.com/@pishchulin",
              "type": "Blog",
              "url": "https://medium.com/feed/@pishchulin",
              "authors": ["Andrew Pishchulin"]
            },
            {
              "title": "Harshad Chawra",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCxbveNIN8WJWmioo42HdQSA",
              "authors": ["Harshad Chawra"]
            },
            {
              "title": "snhackery.com",
              "type": "Blog",
              "url": "https://snhackery.com/feed/",
              "authors": ["snhackery"]
            },
            {
              "title": "earlduque.com",
              "type": "Blog",
              "url": "https://earlduque.com/feed.xml",
              "authors": ["Earl Duque"]
            },
            {
              "title": "Live Hack Streams",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCEHp2B6z09rIW4EunspIL5g",
              "authors": ["Anders Figenschow"]
            },
            {
              "title": "cavucode.com",
              "type": "Blog",
              "url": "http://feeds.feedburner.com/CAVUCode-Blog",
              "authors": ["John Roberts"]
            },
            {
              "title": "ServiceNow Domain Separations",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCgEwvq-suY_-cm68jYG9Exw",
              "authors": [""]
            },
            {
              "title": "SAASWITHSERVICENOW",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCdwco2h46H6tDEDLzolusRQ",
              "authors": ["Gaurav Tripathi"]
            },
            {
              "title": "www.saaswithservicenow.in",
              "type": "Blog",
              "url": "https://www.saaswithservicenow.in/feeds/posts/default?alt=rss",
              "authors": ["Gaurav Tripathi"]
            },
            {
              "title": "Karthik Parthasarathy",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCHWoqQC99iPx6YBD_hKqPcw",
              "authors": ["Karthik Parthasarathy"]
            },
            {
              "title": "jnic13",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC3fSmSXzImsRxfMXOt-MgfQ",
              "authors": ["jnic13"]
            },
            {
              "title": "Cerna Solutions",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC7IZJa42yQtRIzPE8-TaA7Q",
              "authors": [""]
            },
            {
              "title": "ServiceNow",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCLukrOQYSgsHUR_NSiVZndQ",
              "authors": ["ServiceNow"]
            },
            {
              "title": "Nuvolo",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCx4mkwlpBEs8p3mzp2eawAA ",
              "authors": [""]
            },
            {
              "title": "Pharicode",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCuBReW5IcnqvVseMmq5Izbw",
              "authors": [""]
            },
            {
              "title": "Iqra Islam",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCXprymPF0O3H0BvgzNYHudg",
              "authors": ["Iqra Islam"]
            },
            {
              "title": "Covestic",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCYgguaozhKps93zFKUQjuMQ",
              "authors": [""]
            },
            {
              "title": "Fruition Forever",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC3SmMjBuTH91y2i9hfx2JTw",
              "authors": [""]
            },
            {
              "title": "SN Guys",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCG0pvj1MJd0mzTrimw96ZOg",
              "authors": [""]
            },
            {
              "title": "Arnoud Kooi",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCtr-9_HAEAPmcDRQSyKNzxg",
              "authors": [""]
            },
            {
              "title": "SNow Knowledge",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCO7RWBYoD_4RUWWf5DfKa0w",
              "authors": [""]
            },
            {
              "title": "AAspenNow Solutions",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC8Be7Fgt2AM5LjSvFblOZlA",
              "authors": [""]
            },
            {
              "title": "NewRocket, Inc.",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCYp0cbqtyeqJCQbPrQyeevw",
              "authors": [""]
            },
            {
              "title": "ServiceNow Events",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCDTdlx80nh1DG6s4G4H-sFg",
              "authors": [""]
            },
            {
              "title": "Basico ServiceNow Learning",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCBJIhKeKrS5_uMOX0hYDBUw",
              "authors": [""]
            },
            {
              "title": "Kloves Inc.",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCIDFmldcU9tVOtlG0tdZY8Q",
              "authors": [""]
            },
            {
              "title": "Servicenow/UI Tutorials By Pranav",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCAiJSYm6VQvtbcI4BeMFehg",
              "authors": [""]
            },
            {
              "title": "IT Canvass",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCcOeQSl0plQg04_U8Qfry0w",
              "authors": [""]
            },
            {
              "title": "ServiceSharp",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCSeeJVj_21nAieANwbLq0yA",
              "authors": [""]
            },
            {
              "title": "ServicePortal.io",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC0-B_pnLpYx8syFEsqo1X4A",
              "authors": [""]
            },
            {
              "title": "ServiceNow Kida",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCVY9uPWd9wVvzrex2lrRH8Q",
              "authors": [""]
            },{
              "title":"valueflow.com.au",
              "type": "Blog",
              "url":"https://www.valueflow.com.au/blog-feed.xml",
              "authors": [""]
            },
            { "title": "ServiceNow Vimeo", 
              "type": "Vimeo", 
              "url": "https://vimeo.com/servicenow/videos/rss",
              "authors": [""]
            },
            {
              "title": "Crossfuze",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCpLZhZNVnXhmNUlKBMgiJIA",
              "authors": [""]
            },
            {
              "title": "Dhruv Gupta",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCv4FOEe0MZkANapsqhDVRBw",
              "authors": ["Dhruv Gupta"]
            },
            {
              "title": "Semaphore Partners Blog",
              "type": "Blog",
              "url": "https://semaphorepartners.com/rss.xml",
              "authors": ["Jonathan Jacob","Toby Comer"]
            },
            {
              "title": "Dhruven",
              "type": "Blog",
              "url": "https://dhruvsn.wordpress.com/feed/",
              "authors": ["Dhruv Gupta"]
            },
            {
              "title": "Portalorem",
              "type": "Blog",
              "url": "https://portalorem.com/blog?format=rss",
              "authors": ["Sarah Toulson"]
            },
            {
              "title": "The Verbose Log",
              "type": "Blog",
              "url": "https://verboselog.com/rss.xml",
              "authors": ["James Freund"]
            },{
              "title": "TechiMonster",
              "type": "Blog",
              "url": "https://techimonster.com/feed/",
              "authors": ["Praveen Karthi"]
            }//}
            /*{
              "title":"PhxDev",
              What "type":"Blog",
              "url": "",//waiting for a rss feed
              "authors": "Mark Scott"
            }*/
          ];
        /* {
                "title": "john-james-andersen.com",
                "type": "Blog",
                "url": "http://john-james-andersen.com/feed",
                "authors": "John Andersen",
            },*/ 
            
            //{ "title": "Fruition Partners Vimeo", "type": "Vimeo", "url": "https://vimeo.com/user4353238/videos/rss" },
            //{ "title": "Linium Blog", "type": "Blog", "url": "https://www.linium.com/blog/rss.xml" },
            //{ "title": "Reddit", "type": "Questions", "url": "http://reddit.com/r/servicenow/.rss" },
            //{ "title": "StackOverflow", "type": "Questions", "url": "https://stackoverflow.com/feeds/tag?tagnames=servicenow&amp;sort=newest" },

        //(async () => {
        var outputObj = {
            feeds: [],
            news: []
        };
        var promises = [];
        feeds.forEach(function (rssFeed) {
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
        });



        //})();

    }

};
