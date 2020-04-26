//paste this in broswer console on /videos page after you scroll to get all links


var outputArr = [];
$$('#video-title').forEach(function(ele){
  console.log(this, ele.href, ele.text);

if(ele.href){
var today = new Date();
 var link = ele.href.toString() || "";
  outputArr.push({
    title: ele.title.toString(),
    author: " - ",
    category: "YouTube",
    date: today.toISOString(),
    link: link,
    site: "ServiceNow"
  });
}
});
console.log(outputArr);