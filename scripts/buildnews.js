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
              "author": "Sal Costa"
            },
            {
              "title": "An Errant Programmer",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC2ey_HG743-CrxOTPU_ft7g",
              "author": "Sal Costa"
            },
            {
              "title": "andrew.alburydor.com",
              "type": "Blog",
              "url": "https://andrew.alburydor.com/posts/index.xml",
              "author": "Andrew Albury-Dor"
            },
            {
              "title": "Andrew Albury-Dor",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCH1byb2cbzlFrYndyKic_Lg",
              "author": "Andrew Albury-Dor"
            },
            {
              "title": "Ben Hollifield",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCpXBKCVchJqXo08OyD0i2eQ",
              "author": "Ben Hollifield"
            },
            {
              "title": "www.servicenowelite.com",
              "type": "Blog",
              "url": "http://www.servicenowelite.com/blog?format=rss",
              "author": "Mike Kaufman"
            },
            {
              "title": "www.cloudminus89.com",
              "type": "Blog",
              "url": "http://www.cloudminus89.com/feeds/posts/default?alt=rss",
              "author": "Ruen Smith"
            },
            {
              "title": "Code Creative",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCmwKZdMYyUD4AWnAIrx5JVw",
              "author": "Travis Toulson"
            },
            {
              "title": "codecreative.io",
              "type": "Blog",
              "url": "https://codecreative.io/index.xml",
              "author": "Travis Toulson"
            },
            {
              "title": "servicenow.implementation.blog",
              "type": "Blog",
              "url": "https://servicenow.implementation.blog/feed/",
              "author": "Shiva Thomas"
            },
            {
              "title": "Göran Lundqvist",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCUJK90r6dnu-YXHyDOVIRww",
              "author": "Göran Lundqvist"
            },
            {
              "title": "Mark Scott",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCysyuAe0q31GOOedkJja67Q",
              "author": "Mark Scott"
            },
            {
              "title": "mavembry.info",
              "type": "Blog",
              "url": "https://mavembry.info/index.xml",
              "author": "Maverick Embry"
            },
            {
              "title": "Robert, The Duke, Fedoruk",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCfhKNeCYiaJQaaKuACKt0Sg",
              "author": "Robert Fedoruk"
            },
            {
              "title": "Robert, The Duke, Fedoruk",
              "type": "Podcast",
              "url": "https://anchor.fm/s/203322f8/podcast/rss",
              "author": "Robert Fedoruk"
            },
            //
            {
              "title": "Break Point",
              "type": "Podcast",
              "url": "https://www.omnycontent.com/d/playlist/922e0f19-2d84-4485-835c-a83f00036b00/482f14e7-034f-4f55-a28a-abff01781da7/62c03853-0d6b-45ed-88ea-abff01797007/podcast.rss",
              "author": "Chuck Tomasi"
            },
            {
              "title": "CJ & The Duke",
              "type": "Podcast",
              "url": "https://feeds.transistor.fm/cj-the-duke",
              "author": "Robert Fedoruk, and Corey Wesley"
            },
            {
              "title": "jace.pro",
              "type": "Blog",
              "url": "https://jace.pro/index.xml",
              "author": "Jace Benson"
            },
            {
              "title": "ServiceNow Dev Program",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCdXorgCT87YlFRN9n8oJ7_A",
              "author": "Andrew Barnes, Brad Tilton, and Chuck Tomasi"
            },
            {
              "title": "developer.servicenow.com/blog.do",
              "type": "Blog",
              "url": "https://developer.servicenow.com/blog.do?p=/index.xml",
              "author": "Andrew Barnes, and Brad Tilton"
            },
            {
              "title": "servicenowgems.com",
              "type": "Blog",
              "url": "http://servicenowgems.com/feed",
              "author": "Ahmed Hmeid"
            },
            {
              "title": "ServiceNow Community",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCBQU8mlFrElxQNR2mo-gLg",
              "author": " — "
            },
            {
              "title": "ServiceNow Support",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCQjE37R-Y4DTq7kUWPO83Wg",
              "author": "—"
            },
            {
              "title": "ServiceNow TechBytes Podcast",
              "type": "Podcast",
              "url": "https://omny.fm/shows/servicenow-techbytes/playlists/podcast.rss",
              "author": "Steve Miller"
            },
            {
              "title": "ServiceNow Community Podcasts",
              "type": "Podcast",
              "url": "https://omny.fm/shows/servicenow-cloudcast/playlists/servicenow-podcasts.rss",
              "author": " — "
            },
            {
              "title": "servicenowthink.wordpress.com",
              "type": "Blog",
              "url": "https://servicenowthink.wordpress.com/feed",
              "author": "Aleksas Kucinskas"
            },
            {
              "title": "Acorio - Candid Podcast",
              "type": "Podcast",
              "url": "https://feeds.buzzsprout.com/457558.rss",
              "author": "Devon Clarke"
            },
            {
              "title": "finite-partners.com",
              "type": "Blog",
              "url": "https://finite-partners.com/feed",
              "author": "Garrett Griffin-Morales"
            },
            {
              "title": "hiresumo.com/home",
              "type": "Blog",
              "url": "https://hiresumo.com/home?format=rss",
              "author": " — "
            },
            {
              "title": "servicenowguru.com",
              "type": "Blog",
              "url": "https://www.servicenowguru.com/feed/",
              "author": "Mark Stanger"
            },
            {
              "title": "www.covestic.com",
              "type": "Blog",
              "url": "https://www.covestic.com/feed/",
              "author": " — "
            },
            {
              "title": "www.thinkahead.com/",
              "type": "Blog",
              "url": "https://www.thinkahead.com/feed",
              "author": " — "
            },
            {
              "title": "aeritae.com",
              "type": "Blog",
              "url": "https://aeritae.com/blog/feed",
              "author": " — "
            },
            {
              "title": "serviceportal.io",
              "type": "Blog",
              "url": "https://serviceportal.io/feed",
              "author": "Nathan Firth"
            },
            {
              "title": "GlideFast",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCZNM56LyLhmba73FtDsyaAw",
              "author": " — "
            },
            {
              "title": "ServiceSharp",
              "type": "Podcast",
              "url": "https://anchor.fm/s/a71217c/podcast/rss",
              "author": "Randy Haas and Jason Gibson"
            },
            {
              "title": "workflow.servicenow.com",
              "type": "Newsletter",
              "url": "https://workflow.servicenow.com/feed/",
              "author": " — "
            },
            {
              "title": "snprotips.com",
              "type": "Blog",
              "url": "https://snprotips.com/?format=rss",
              "author": "Tim Woodruff"
            },
            {
              "title": "www.snc-blog.com",
              "type": "Blog",
              "url": "http://www.snc-blog.com/feed",
              "author": " — "
            },
            {
              "title": "sncdevelopment.com",
              "type": "Blog",
              "url": "https://sncdevelopment.com/feed",
              "author": "James Naphen"
            },
            {
              "title": "womennow.dev",
              "type": "Blog",
              "url": "https://womennow.dev/?feed=rss2",
              "author": "Paige"
            },
            {
              "title": "pathwayscg.com",
              "type": "Blog",
              "url": "https://pathwayscg.com/feed/",
              "author": "Kaitlyn Giovinazzo"
            },
            {
              "title": "Man Myth and Legend",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCT3ONLZwnTIfmVqRiDsRMVA",
              "author": "Lord Ryan Gillespie"
            },
            {
              "title": "PhilGoesDeep",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCTmjY6H5roYkGQmwAQAcgQ",
              "author": "Phil Swann"
            },
            {
              "title": "www.dylanlindgren.com",
              "type": "Blog",
              "url": "https://www.dylanlindgren.com/feed/",
              "author": "Dylan Lindgren"
            },
            {
              "title": "ServiceNow Geek",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCKMW-HaQjgHvSG5CBCLHPA",
              "author": "Jeremy Duncan"
            },
            {
              "title": "helpfultechblog.com",
              "type": "Blog",
              "url": "http://helpfultechblog.com/feed/",
              "author": "Phuong Nguyen"
            },
            {
              "title": "medium.com/@pishchulin",
              "type": "Blog",
              "url": "https://medium.com/feed/@pishchulin",
              "author": "Andrew Pishchulin"
            },
            {
              "title": "Harshad Chawra",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCxbveNIN8WJWmioo42HdQSA",
              "author": "Harshad Chawra"
            },
            {
              "title": "snhackery.com",
              "type": "Blog",
              "url": "https://snhackery.com/feed/",
              "author": "snhackery"
            },
            {
              "title": "earlduque.com",
              "type": "Blog",
              "url": "https://earlduque.com/feed.xml",
              "author": "Earl Duque"
            },
            {
              "title": "Live Hack Streams",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCEHp2B6z09rIW4EunspIL5g",
              "author": "Anders Figenschow"
            },
            {
              "title": "cavucode.com",
              "type": "Blog",
              "url": "http://feeds.feedburner.com/CAVUCode-Blog",
              "author": "John Roberts"
            },
            {
              "title": "ServiceNow Domain Separations",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCgEwvq-suY_-cm68jYG9Exw",
              "author": " — "
            },
            {
              "title": "SAASWITHSERVICENOW",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCdwco2h46H6tDEDLzolusRQ",
              "author": "Gaurav Tripathi"
            },
            {
              "title": "www.saaswithservicenow.in",
              "type": "Blog",
              "url": "https://www.saaswithservicenow.in/feeds/posts/default?alt=rss",
              "author": "Gaurav Tripathi"
            },
            {
              "title": "Karthik Parthasarathy",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCHWoqQC99iPx6YBD_hKqPcw",
              "author": "Karthik Parthasarathy"
            },
            {
              "title": "jnic13",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC3fSmSXzImsRxfMXOt-MgfQ",
              "author": "jnic13"
            },
            {
              "title": "Cerna Solutions",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC7IZJa42yQtRIzPE8-TaA7Q",
              "author": " — "
            },
            {
              "title": "ServiceNow",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCLukrOQYSgsHUR_NSiVZndQ",
              "author": "ServiceNow"
            },
            {
              "title": "Nuvolo",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCx4mkwlpBEs8p3mzp2eawAA ",
              "author": " — "
            },
            {
              "title": "Pharicode",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCuBReW5IcnqvVseMmq5Izbw",
              "author": " — "
            },
            {
              "title": "Iqra Islam",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCXprymPF0O3H0BvgzNYHudg",
              "author": "Iqra Islam"
            },
            {
              "title": "Covestic",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCYgguaozhKps93zFKUQjuMQ",
              "author": " — "
            },
            {
              "title": "Fruition Forever",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC3SmMjBuTH91y2i9hfx2JTw",
              "author": " — "
            },
            {
              "title": "SN Guys",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCG0pvj1MJd0mzTrimw96ZOg",
              "author": " — "
            },
            {
              "title": "Arnoud Kooi",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCtr-9_HAEAPmcDRQSyKNzxg",
              "author": " — "
            },
            {
              "title": "SNow Knowledge",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCO7RWBYoD_4RUWWf5DfKa0w",
              "author": " — "
            },
            {
              "title": "AAspenNow Solutions",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC8Be7Fgt2AM5LjSvFblOZlA",
              "author": " — "
            },
            {
              "title": "NewRocket, Inc.",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCYp0cbqtyeqJCQbPrQyeevw",
              "author": " — "
            },
            {
              "title": "ServiceNow Events",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCDTdlx80nh1DG6s4G4H-sFg",
              "author": " — "
            },
            {
              "title": "Basico ServiceNow Learning",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCBJIhKeKrS5_uMOX0hYDBUw",
              "author": " — "
            },
            {
              "title": "Kloves Inc.",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCIDFmldcU9tVOtlG0tdZY8Q",
              "author": " — "
            },
            {
              "title": "Servicenow/UI Tutorials By Pranav",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCAiJSYm6VQvtbcI4BeMFehg",
              "author": " — "
            },
            {
              "title": "IT Canvass",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCcOeQSl0plQg04_U8Qfry0w",
              "author": " — "
            },
            {
              "title": "ServiceSharp",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCSeeJVj_21nAieANwbLq0yA",
              "author": " — "
            },
            {
              "title": "ServicePortal.io",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC0-B_pnLpYx8syFEsqo1X4A",
              "author": " — "
            },
            {
              "title": "ServiceNow Kida",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCVY9uPWd9wVvzrex2lrRH8Q",
              "author": " — "
            },{
              "title":"valueflow.com.au",
              "type": "Blog",
              "url":"https://www.valueflow.com.au/blog-feed.xml",
              "author": " — "
            },
            { "title": "ServiceNow Vimeo", 
              "type": "Vimeo", 
              "url": "https://vimeo.com/servicenow/videos/rss",
              "author": " — "
            },
            {
              "title": "Crossfuze",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCpLZhZNVnXhmNUlKBMgiJIA",
              "author": " — "
            },
            {
              "title": "Dhruv Gupta",
              "type": "YouTube",
              "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCv4FOEe0MZkANapsqhDVRBw",
              "author": "Dhruv Gupta"
            },
            {
              "title": "Semaphore Partners Blog",
              "type": "Blog",
              "url": "https://semaphorepartners.com/rss.xml",
              "author": "Jonathan Jacob and Toby Comer"
            }
          ];
        /* {
                "title": "john-james-andersen.com",
                "type": "Blog",
                "url": "http://john-james-andersen.com/feed",
                "author": "John Andersen",
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
                        author: rssFeed.author//item.author || 
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
