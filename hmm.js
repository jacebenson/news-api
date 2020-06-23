var arr = [];
    $$('ytd-playlist-panel-video-renderer > a').forEach(function (element) {
    console.log(element.href);
    var videoURL = new URL(element.href);
    var videoURLParams = videoURL.searchParams;
    var videoID = videoURLParams.get('v')
    console.log(videoURLParams.get('v'));
    var noembedURL = 'https://noembed.com/embed?url=http://www.youtube.com/watch?v=' + videoID;
    /**
     * ,{
    "date": "2020-01-20T13:05:07.000Z",
    "site": "ServiceNow HI Videos",
    "category": "YouTube",
    "title": "Troubleshooting a Failed Discovery Part 2 of 5: Scanning Phase",
    "author": "",
    "link": ""
 },{
     */
    fetch(noembedURL)
        .then(async r => (
            //console.log(await (r.json()))
            arr.push(await r.json())
            )
        )
        .catch(e => console.error('Boo...' + e));

    //No fear...
    (async () =>
        console.log(
            (await (await fetch(jsonURL)).json()), '... from async'
        )
    )();
});
var feed = arr.map(function(video){
    return {
        date: new Date().toISOString(),
        site: "ServiceNow HI Videos",
        category: "YouTube",
        title: video.title,
        author: video.author_name,
        link: video.url
    }
})
//https://hi.service-now.com/kb_view.do?sys_kb_id=d5da8270db749450f7fca851ca9619cf&sysparm_rank=16&sysparm_tsqueryId=dbbe41acdb291810f7fca851ca9619fc

/**
 * var arr = [];
$$('.cm-content-header > a').forEach(function (element) {
    //console.log($(element).text());
    //console.log(element.href);
    //console.log(element);
    arr.push({
        "date": "2019-05-05T00:00:00.000Z",
        "site": "Knowledge 19",
        "category": "Presentation",
        "title": $(element).text(),
        "author": "Miscellaneous",
        "link": element.href
    })
    /**
     * ,{
    "date": "2020-01-20T13:05:07.000Z",
    "site": "ServiceNow HI Videos",
    "category": "YouTube",
    "title": "Troubleshooting a Failed Discovery Part 2 of 5: Scanning Phase",
    "author": "",
    "link": ""
    },{
   
});
console.log(arr);
 */