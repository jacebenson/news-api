var xmlhttp = new XMLHttpRequest();
let params = (new URL(document.location)).searchParams;
let start = params.get('start'); // is the string "Jonathan Smith".
let end = params.get('end');
var url = "https://zen-jones-6f4442.netlify.com/.netlify/functions/server";
if (start && !end) {
  url = url + '?start=' + start;
}
if (start && end) {
  url = url + '?start=' + start + '&end=' + end;
}
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var responseObj = JSON.parse(this.responseText);
    parseResponse(responseObj);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

$('#news-query').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});

function parseResponse(responseObj) {
  console.log(responseObj);
  var table = document.getElementById('newsTable');
  var news = responseObj.filteredFeeds;
  news.forEach(function (item) {
    var tr = document.createElement('tr');
    var date = document.createElement('td');
    var d = new Date(item.date)
    date.innerText = d.toLocaleDateString();
    var type = document.createElement('td');
    type.innerText = item.category;
    var site = document.createElement('td');
    if (item.author) {
      site.innerText = item.site + ' - ' + item.author;
    } else {
      site.innerText = item.site;
    }

    var link = document.createElement('td');
    link.innerHTML = '<a href="' + item.link + '" target="_blank">' + item.title + '</a>';
    tr.appendChild(date);
    tr.appendChild(type);
    tr.appendChild(site);
    tr.appendChild(link);
    table.appendChild(tr);
  });
  $('#newsTable').dataTable();
  var navigationBar = document.createElement('div');
  navigationBar.setAttribute('class', 'row');
  var previous = document.createElement('a');
  previous.setAttribute('id', 'previous');
  previous.innerHTML = 'Previous';
  var previousDate;
  if (start) {
    previousDate = new Date(start);
  } else {
    previousDate = new Date()
  }
  previousDate.setDate(previousDate.getDate() - 30)
  previous.setAttribute('href', '/news?start=' + previousDate.toISOString().split('T')[0]);

  var next = document.createElement('a');
  var nextDate = new Date(previousDate.toISOString());
  nextDate.setDate(nextDate.getDate() + 60);
  next.setAttribute('id', 'next');
  next.innerHTML = 'Next';
  next.setAttribute('href', '/news?start=' + nextDate.toISOString().split('T')[0]);

  navigationBar.appendChild(previous);
  navigationBar.appendChild(next);
  var newsSection = document.getElementById('news');
  newsSection.appendChild(navigationBar);
}