
$$('ytd-playlist-panel-video-renderer > a').forEach(function (element) {
    console.log(element.href);
    var videoURL = new URL(element.href);
    var videoURLParams = videoURL.searchParams;
    var videoID = videoURLParams.get('v')
    console.log(videoURLParams.get('v'));
    var noembedURL = 'https://noembed.com/embed?url=http://www.youtube.com/watch?v=' + videoID;

    //http = new XMLHttpRequest()

    //http.open("GET", noembedURL)
    //http.send()

    //http.onload = () => console.log(http.responseText)
    fetch(noembedURL)
        .then(async r => console.log(await r.text(), '... from then'))
        .catch(e => console.error('Boo...' + e));

    //No fear...
    (async () =>
        console.log(
            (await (await fetch(jsonURL)).json()), '... from async'
        )
    )();
});


/*var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = ProcessVideo;
xmlHttp.open('GET', noembedURL, true);
xmlHttp.send();
}
function ProcessVideo(){
  if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
    console.log(xmlHttp.response);
  }
}
*/
//'http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3DbDOYN-6gdRE&callback=my_embed_function'
