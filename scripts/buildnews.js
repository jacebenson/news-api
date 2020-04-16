module.exports = {
    build: function (callback) {
        let Parser = require('rss-parser');
        let parser = new Parser();
        const fs = require('fs');
        let feedPath = "./feeds.json"

        let feeds = [
            {
                "title": "An Errant Programmer",
                "type": "Blog",
                "url": "http://anerrantprogrammer.com/?feed=rss2",
                "author": "Sal Costa"
            }, {
                "title": "An Errant Programmer",
                "type": "YouTube",
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC2ey_HG743-CrxOTPU_ft7g",
                "author": "Sal Costa"
            }, {
                "title": "Andrew Albury-Dor",
                "type": "Blog",
                "url": "https://andrew.alburydor.com/posts/index.xml",
                "author": "Andrew Albury-Dor"
            }, {
                "title": "Andrew Albury-Dor",
                "type": "YouTube",
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCH1byb2cbzlFrYndyKic_Lg",
                "author": "Andrew Albury-Dor"
            }, {
                "title": "Ben Hollifield",
                "type": "YouTube",
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCpXBKCVchJqXo08OyD0i2eQ",
                "author": "Ben Hollifield"
            }, {
                "title": "ServiceNow Elite",
                "type": "Blog",
                "url": "http://www.servicenowelite.com/blog?format=rss",
                "author": "Mike Kaufman"
            }, {
                "title": "CloudMinus89",
                "type": "Blog",
                "url": "http://www.cloudminus89.com/feeds/posts/default?alt=rss",
                "author": "Ruen Smith"
            }, {
                "title": "Code Creative",
                "type": "YouTube",
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCmwKZdMYyUD4AWnAIrx5JVw",
                "author": "Travis Toulson"
            }, {
                "title": "Code Creative",
                "type": "Blog",
                "url": "https://codecreative.io/index.xml",
                "author": "Travis Toulson"
            }, {
                "title": "Shiva Thomas",
                "type": "Blog",
                "url": "https://servicenow.implementation.blog/feed/",
                "author": "Shiva Thomas"
            }, {
                "title": "Göran Lundqvist",
                "type": "YouTube",
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCUJK90r6dnu-YXHyDOVIRww",
                "author": "Göran Lundqvist"
            }, {
                "title": "John James Andersen",
                "type": "Blog",
                "url": "http://john-james-andersen.com/feed",
                "author": "John Andersen",
            }, {
                "title": "Mark Scott",
                "type": "YouTube",
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCysyuAe0q31GOOedkJja67Q",
                "author": "Mark Scott",
            }, {
                "title": "mavembry.info",
                "type": "Blog",
                "url": "https://mavembry.info/index.xml",
                "author": "Maverick Embry"
            }, {
                "title": "Robert, The Duke, Fedoruk",
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCfhKNeCYiaJQaaKuACKt0Sg",
                "author": "Robert Fedoruk"
            }, {
                "title": "CJ & The Duke",
                "type": "Podcast", 
                "url": "https://feeds.transistor.fm/cj-the-duke",
                "author": "Robert Fedoruk, and Corey Wesley"
            }, {
                "title": "jace.pro",
                "type": "Blog", 
                "url": "https://jace.pro/index.xml",
                "author": "Jace Benson"
            }, {
                "title": "ServiceNow Dev Program",
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCdXorgCT87YlFRN9n8oJ7_A",
                "author": "Andrew Barnes, Brad Tilton, and Chuck Tomasi"
            }, {
                "title": "ServiceNow Developer Blog",
                "type": "Blog", 
                "url": "https://developer.servicenow.com/blog.do?p=/index.xml",
                "author": "Andrew Barnes, and Brad Tilton"
            }, {
                "title": "ServiceNow Gems",
                "type": "Blog", 
                "url": "http://servicenowgems.com/feed",
                "author": "Ahmed Hmeid"
            }, {
                "title": "ServiceNow Community", 
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCBQU8mlFrElxQNR2mo-gLg",
                "author": "Miscellaneous"
            }, {
                "title": "ServiceNow Support", 
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCQjE37R-Y4DTq7kUWPO83Wg",
                "author": "— "
            }, {
                "title": "ServiceNow TechBytes Podcast", 
                "type": "Podcast", 
                "url": "https://omny.fm/shows/servicenow-techbytes/playlists/podcast.rss",
                "author": "Steve Miller"
            }, {
                "title": "ServiceNow Community Podcasts", 
                "type": "Podcast", 
                "url": "https://omny.fm/shows/servicenow-cloudcast/playlists/servicenow-podcasts.rss",
                "author": "Miscellaneous."
            }, {
                "title": "ServiceNow Think", 
                "type": "Blog", 
                "url": "https://servicenowthink.wordpress.com/feed",
                "author": "Aleksas Kucinskas"
            }, {
                "title": "Acorio - Candid Podcast", 
                "type": "Podcast", 
                "url": "https://feeds.buzzsprout.com/457558.rss",
                "author": "Devon Clarke"
            }, {
                "title": "Finite Partners", 
                "type": "Blog", 
                "url": "https://finite-partners.com/feed",
                "author": "Garrett Griffin-Morales"
            }, {
                "title": "Sumo IT", 
                "type": "Blog", 
                "url": "https://hiresumo.com/home?format=rss",
                "author": "— "
            }, {
                "title": "SNGuru", 
                "type": "Blog", 
                "url": "https://www.servicenowguru.com/feed/",
                "author": "Mark Stanger"
            }, {
                "title": "Covestic", 
                "type": "Blog", 
                "url": "https://www.covestic.com/feed/",
                "author": "— "
            }, {
                "title": "Ahead LLC", 
                "type": "Blog",
                 "url": "https://www.thinkahead.com/feed",
                 "author": "— "
            }, {
                "title": "Aeritae Blog", 
                "type": "Blog", 
                "url": "https://aeritae.com/blog/feed",
                "author": "— "
            }, {
                "title": "ServicePortal.io", 
                "type": "Blog", 
                "url": "https://serviceportal.io/feed",
                "author": "Nathan Firth"
            }, {
                "title": "GlideFast",
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCZNM56LyLhmba73FtDsyaAw",
                "author": "— "
            }, {
                "title": "ServiceSharp", 
                "type": "Podcast", 
                "url": "https://anchor.fm/s/a71217c/podcast/rss",
                "author": "Randy Haas and Jason Gibson"
            }, {
                "title": "Workflow", 
                "type": "Newsletter", 
                "url": "https://workflow.servicenow.com/feed/",
                "author": "Miscellaneous"
            }, {
                "title": "SNProtips", 
                "type": "Blog", 
                "url": "https://snprotips.com/?format=rss",
                "author": "Tim Woodruff"
            }, {
                "title": "SNC-Blog", 
                "type": "Blog", 
                "url": "http://www.snc-blog.com/feed",
                "author": "Miscellaneous"
            }, {
                "title": "SNDevelopment", 
                "type": "Blog", 
                "url": "https://sncdevelopment.com/feed",
                "author": "James Naphen"
            }, {
                "title": "WomenNow", 
                "type": "Blog", 
                "url": "https://womennow.dev/?feed=rss2",
                "author": "Paige"
            }, {
                "title": "Pathway",
                "type": "Blog", 
                "url": "https://pathwayscg.com/feed/",
                "author": "Kaitlyn Giovinazzo"
            }, {
                "title": "Man Myth and Legend", 
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCT3ONLZwnTIfmVqRiDsRMVA",
                "author": "Lord Ryan Gillespie"
            }, {
                "title": "PhilGoesDeep", 
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCTmjY6H5roYkGQmwAQAcgQ",
                "author": "Phil Swann"
            }, {
                "title": "Dylan Lindgren", 
                "type": "Blog", 
                "url": "https://www.dylanlindgren.com/feed/",
                "author": "Dylan Lindgren", 
            }, {
                "title": "ServiceNow Geek", 
                "type": "YouTube", 
                "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCCKMW-HaQjgHvSG5CBCLHPA",
                "author": "Jeremy Duncan"
            }
            //{ "title": "ServiceNow Vimeo", "type": "Vimeo", "url": "https://vimeo.com/servicenow/videos/rss" },
            //{ "title": "Fruition Partners Vimeo", "type": "Vimeo", "url": "https://vimeo.com/user4353238/videos/rss" },
            //{ "title": "Linium Blog", "type": "Blog", "url": "https://www.linium.com/blog/rss.xml" },
            //{ "title": "Plat4mation Blog", "type": "Blog", "url": "https://www.plat4mation.com/feed/" },
            //{ "title": "Reddit", "type": "Questions", "url": "http://reddit.com/r/servicenow/.rss" },
            //{ "title": "StackOverflow", "type": "Questions", "url": "https://stackoverflow.com/feeds/tag?tagnames=servicenow&amp;sort=newest" },
        ];

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
                feed.items.forEach(function (item) {
                    outputObj.news.push({
                        date: item.isoDate,
                        site: rssFeed.title,
                        category: rssFeed.type,
                        title: item.title,
                        link: item.link,
                        author: item.author || rssFeed.author
                    });
                    //console.log(item);
                    //console.log(item.title + ':' + item.link);
                    // modify title to filename
                    // prepend domain to filename
                    //var filename = title.replace//all the non-a-z0 w/_
                    //console.log(JSON.stringify(item,'',' '));
                });

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
                                    var adate = new Date(a.date);
                                    var bdate = new Date(b.date);
                                    return bdate - adate;
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
