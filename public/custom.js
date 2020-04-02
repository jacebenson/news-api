
window.getRandomJoke= function() {
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
    var loadedJoke = JSON.parse(this.responseText);
    $('#text').text(loadedJoke.joke);
    $('#author').text(loadedJoke.punchline);
    $('#tweet-joke').attr('href', 'https://twitter.com/intent/tweet?hastags=dadjoke&related=joke.jace.pro&text=' + loadedJoke.joke + " https://joke.jace.pro/?id=" + loadedJoke.id);
  }
  });
  if(arguments[0]){
    xhr.open("GET", "/.netlify/functions/server/id/" + arguments[0]);
  } else {
    xhr.open("GET", "/.netlify/functions/server");
  }
  xhr.send(data);
}
$(function () {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  if(id){
    window.getRandomJoke(id); 
  } else {
    window.getRandomJoke();
  }
  $('#new-joke').click(function () {
    window.getRandomJoke();
  });
})
