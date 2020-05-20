//to be used in browser console
var x = document.getElementsByClassName('sn-on-demand');
var baseURL = 'http://players.brightcove.net/5703385908001/zKNjJ2k2DM_default/index.html?videoId=ref:K20-';
var arrObj = [];
var n = 7; //Used to get the K20 session ID

for (i = 0; i < x.length; i++) {
    var obj = {};
    /*
     {
  "date": "2020-05-08T18:44:18.000Z",
  "site": "ServiceNow Blogs",
  "category": "Blog",
  "title": "CSDM K20 LAB: Gift #1 \"Impacted Business Application\"",
  "author": "scott.lemm",
  "link": "https://community.servicenow.com/community?id=community_article&sys_id=c71ac79bdb6c90105129a851ca96199d"
 },
  */
 //obj.date
 //obj.site="Knowledge 20"
 //obj.category = "Video"
 //obj.title = x[i].getElementsByClassName('title-text')[0].innerText
    //Session Type:
    obj.type = x[i].getElementsByClassName('rf-session-type')[0].innerHTML;
    //Title:
    obj.title = x[i].getElementsByClassName('title-text')[0].innerText;

    //URL:
    obj.url = x[i].getElementsByClassName('collapsed')[0].href;

    //VideoURL:
    var text = x[i].getElementsByClassName('title-text')[0].innerText;
    text = text.replace('(', '');
    text = text.replace('(', '');
    text = text.replace(')', '');
    text = text.replace(')', '');
    text = text.substring(text.length - n);
    obj.videoURL = baseURL + text;

    //Title Abstract:
    var abstract = text.toLowerCase().toString();
    obj.titleAbstract = document.getElementById(abstract).getElementsByTagName('span')[0].innerHTML;
    
    arrObj.push(obj);
}

for (j = 0; j < arrObj.length; j++) {
    console.log(JSON.stringify(arrObj[j]) + ",");
}

//console.log(arrObj);

var y = document.getElementsByClassName('sn-live');
//var arrObj = [];

for (i = 0; i < y.length; i++) {
    var obj = {};
    //Session Type:
    obj.type = y[i].getElementsByClassName('rf-session-type')[0].innerHTML;
    //Title:
    obj.title = y[i].getElementsByClassName('title-text')[0].innerText;
    //URL:
    obj.url = y[i].getElementsByClassName('collapsed')[0].href;

    //VideoURL:
    // var text = x[i].getElementsByClassName('title-text')[0].innerText;
    // text = text.split('(');
    // text = text[1];
    // text = text.replace(')', '');
    // obj.videoURL = baseURL + text;

    arrObj.push(obj);
}