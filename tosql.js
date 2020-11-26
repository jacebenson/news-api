const fs = require('fs');

var feeds = require('./feeds.json');

//feeds.length = 10;
/**
 * id,url,title,authors,source,type,created
2, https://developer.servicenow.com/blog.do,Developer, "[""Andrew Barnes"", ""Brad Tilton"", ""Chuck Tomasi""]",ServiceNow,audio,32:44.1
1,https://jace.pro/hello-world,Hello World,"[""Jace Benson"", ""Andrew Albory-Dor""]",jace.pro,blog,32:44.1

 {
  "date": "2020-10-29T15:30:38.001Z",
  "site": "ServiceNow Community",
  "category": "YouTube",
  "title": "Community Live Stream - API Adventures - Scripted REST APIs and Service Portal Widgets",
  "link": "https://www.youtube.com/watch?v=Zl1WcLmrKNM",
  "author": ""
 },
 */
feeds.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });
//  console.log('id,url,title,authors,source,type,created');
returnFeed = feeds.map(function(item, index){
    var date = new Date(item.date);
    date = date.toISOString();
    date = date.replace('T',' ');
    date = date.replace('Z','');
    var title = item.title.replace(',','');
    
    var title = item.title.replace(',',' and ');
    var line = [index, item.link, title, item.author, item.site, item.category, date]
    //console.log(line.toString());
if(item.category == "Blog" || item.category == "Article" || item.category == "Newsletter"){
  category = "text"
}
if(item.category == "Podcast"){
  category = "audio"
}
if(item.category.toLowerCase() == "toutube" || item.category == "Video"){
  category = "video"
}
    return {
      id: index,
      updated: item.date,
      created: item.date,
      url: item.link,
      authors: item.author,
      title: item.title,
      rendered: 0,
      clicked: 0,
      type: category,
    };
});

/**
 * 
 * INSERT INTO "ItemLink" ("id", "updated", "created", "url", "author", "title", "rendered", "clicked", "contentType") VALUES
(1,	'2020-11-21 13:39:00',	'2020-11-21 13:39:00',	'https://example.com',	'Jace',	'Example',	0,	0,	'text');
 */
var returnStr = '';

returnFeed.forEach(function(line){
  var title = line.title.replace(/\'/gm, "''");
  title = title.replace(/\"/gm, '""');
  if(title.length === 0){
    title = "Untitled";
  }
  var author = line.authors.replace(/\'/gm, "''");
  author = author.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
  returnStr += 'INSERT INTO "ItemLink" ("id", "updated", "created", "url", "author", "title", "rendered", "clicked", "contentType") VALUES (';
  returnStr += line.id + ',';
  returnStr += '\'' + line.updated + '\',';
  returnStr += '\'' + line.created + '\',';
  returnStr += '\'' + line.url + '\',';
  returnStr += '\'' + author + '\',';
  returnStr += '\'' + title + '\',';
  returnStr += '' + line.rendered + ',';
  returnStr += '' + line.clicked + ',';
  returnStr += '\'' + line.type + '\');\n';
  return returnStr;
})
//console.log(returnFeed);
fs.writeFileSync("./feeds2.sql", returnStr);