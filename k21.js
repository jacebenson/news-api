//events.servicenow.com/widget/servicenow/knowledge2021/library?showKnowledgeConnect=false
var arrOfVideos = [];
var sessions = $$('.catalog-result');
//sessions.length = 3;
sessions.forEach(function (session) {
    //try{
    //let session = sessions[0];
    //$$('.catalog-result-title').forEach((element)=>{
    //console.log(session);
    //console.log(session.querySelector('.badges').querySelector('.rf-time').innerText);
    //console.log(session.querySelector('.badges').querySelector('.rf-time').innerText.split(' ')[4]);
    var title = session.querySelector('.session-title').querySelector('.title-text').innerText;
    var videoObj = {
        title: session.querySelector('.session-title').querySelector('.title-text').innerText,
        date: (function () {

            if (session.querySelector('.badges').querySelector('.rf-time')) {
                return new Date(`2021-05-${session.querySelector('.badges').querySelector('.rf-time').innerText.split(' ')[4]}`).toISOString()
            } else {
                console.log(session.querySelector('.badges').querySelector('.rf-time'));
                return "?"
            }
        })(),
        category: "Video",
        site: (function () {
            if (session.querySelector('.badges').querySelector('.rf-session-type')) {
                return "Knowledge 21 " + session.querySelector('.badges').querySelector('.rf-session-type').innerText;
            } else {
                return "Knowledge 21"
            }
        })(),
        author: (function () {
            var returnArr = [];
            if (session.querySelector('.rf-attribute > .speaker-details')) {
                var authorsElements = session.querySelector('.rf-attribute > .speaker-details').children;
                authorsElements.forEach(function (authorElement) {
                    returnArr.push(authorElement.querySelector('.speaker-trigger').innerText)
                })
                return returnArr.toString()
            }
        })(),
        link: (function () {
            /**
             * CCE *doesnt work
             * KEY *doenst work (mostly)
             * ACT *doesnt work
             * CCG *doesnt work
             * CCHACK *doesnt work
             * LAB *doenst work
             * CCL *works
             * SPN *works
             * DEM *works
             * CCB *works
             */
            if (title && (title.includes('[CCE') || title.includes('[KEY') || title.includes('[ACT') || title.includes('[CCG') || title.includes('[CCHACK') || title.includes('[LAB'))) {
                session.querySelector('.session-title').querySelector('.collapsed').href
                return session.querySelector('.session-title').querySelector('.collapsed').href;
            } else {
                //remove a/b/c from key string
                let keystr = title.split('[')[1].split(']')[0];
                const regex = /([A-Z]{3}[0-9]{4})([a-z]?)(\-K21)/gm;
                const subst = `$1$3`;
                const result = keystr.replace(regex, subst);

                return 'https://players.brightcove.net/5703385908001/zKNjJ2k2DM_default/index.html?videoId=ref:' + result

            }
        })()
    }
    arrOfVideos.push(videoObj)
    //} catch(e){
    //console.log(`${session.children[1].innerText} issue`, e)
    //}
    //console.log(videoObj)
    //console.log( session[0]);
});
console.log(arrOfVideos.length)

console.log(JSON.stringify(arrOfVideos));