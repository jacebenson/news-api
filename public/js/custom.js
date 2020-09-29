/**
 * This file contains all the JS for this site.
 * First - Object extra functions
 * Date.addDays - to a
 */



/**
 * addDays - returns a date, after adding x days
 * @param  {number} days
 */
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * setValue - set's the fields on the page
 * @param  {string} elementId 
 * @param  {string} value
 */
function setValue(elementId, value) {
  //console.log('trying to set', elementId, 'to', value);
  //console.log('document.getElementById("'+elementId+'").value("'+value+'");')
  document.getElementById(elementId).value = value;
}

function getValue(elementId) {
  //console.log('trying to set', elementId, 'to', value);
  //console.log('document.getElementById("'+elementId+'").value("'+value+'");')
  return document.getElementById(elementId).value || false;
}

function setValuesFromURL(url) {
  var urlParam = new URL(url);
  urlParam = new URLSearchParams(urlParam.search)
  if (urlParam.has('text')) {
    setValue('searchtext', urlParam.get('text'));
  }
  if (urlParam.has('start')) {
    setValue('start', urlParam.get('start'));
  } else {
    var start = new Date().addDays(-14);
    start = start.toISOString().split('T')[0];
    var end = new Date().toISOString().split('T')[0];
    setValue('start', start);
  }
  if (urlParam.has('end')) {
    setValue('end', urlParam.get('end'));
  } else {
    var end = new Date().toISOString().split('T')[0];
    setValue('end', end);
  }
}

function submitForm() {
  //event.preventDefault();  To prevent following the link (optional)
  var form = {};
  form.start = getValue('start');
  form.end = getValue('end');
  form.search = getValue('searchtext');
  form.finalQuery = [];
  form.dateQuery = 'start=' + form.start + '&end=' + form.end;
  form.finalQuery.push(form.dateQuery);
  if (form.search.length > 0) {
    form.searchQuery = 'text=' + form.search;
    form.finalQuery.push(form.searchQuery);
  }
  console.log(form);
  window.location.href = './?' + form.finalQuery.join('&');
}

function preventSubmitwithEnter() {
  var formElement = document.getElementById("news-search");

  function handleForm(event) {
    event.preventDefault();
  }
  formElement.addEventListener('submit', handleForm);
}

function submitWithEnterInTextbox() {
  document
    .getElementById('searchtext')
    .addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        // code for enter
        //debugger;
        console.log('enter pressed')
        submitForm();
      }
    });
}

function submitWithEnterInStart() {
  document
    .getElementById('start')
    .addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        // code for enter
        //debugger;
        console.log('enter pressed')
        submitForm();
      }
    });
}

function submitWithEnterInEnd() {
  document
    .getElementById('start')
    .addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        // code for enter
        //debugger;
        console.log('enter pressed')
        submitForm();
      }
    });
}

function submitWithButton() {
  document.getElementById('submitquery').addEventListener('click', function () {
    submitForm();
  });
}

function executeSearch() {
  var url = "https://news.jace.pro/.netlify/functions/server";
  var pageUrl = new URL(document.URL);
  var queryUrl = new URL(url);
  url += pageUrl.search;
  if (pageUrl.search) {
    queryUrl.searchParams.set('unique', new Date().toISOString());
  }
  if (getValue('start')) {
    queryUrl.searchParams.set('start', getValue('start'));
  }
  if (getValue('end')) {
    queryUrl.searchParams.set('end', getValue('end'));
  }
  if (getValue('searchtext')) {
    queryUrl.searchParams.set('text', getValue('searchtext'));
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": queryUrl.toString(),
    "method": "GET",
    "headers": {}
  }
  jQuery
    .ajax(settings)
    .done(function (response) {
      parseResponse(response);
    });
}


function parseResponse(responseObj) {
  console.log(responseObj);
  var table = document.getElementById('newsTable');
  var news = responseObj.filteredFeeds;
  if (news.length === 0) {}
  news.forEach(function (item) {
    var tr = document.createElement('tr');
    var date = document.createElement('td');
    var d = new Date(item.date)
    date.innerText = d.toLocaleDateString();
    var type = document.createElement('td');
    type.innerText = item.category;
    var site = document.createElement('td');
    site.innerText = item.site;
    var author = document.createElement('td');
    if (item.author) {
      var patrons = [
        "Andrew Albury-Dor",
        "Kevin Clark",
        "kevclark",
        "Alex Darby",
        "amullendarby"
      ]
      patrons.forEach(function (name) {
        if (item.author == name) {
          author.classList.add('bg-primary'); // text-white');
          author.classList.add('text-white'); // text-white');
          author.classList.add('rounded'); // text-white');
          item.author = '🌟' + item.author + '🌟';
        }
      });

      if (item.author == "Jace Benson") {
        author.classList.add('bg-secondary'); // text-white');
        author.classList.add('text-white'); // text-white');
        author.classList.add('rounded'); // text-white');
        item.author = '🌟' + item.author + '🌟';
      }
      author.innerText = item.author;
    } else {
      author.innerText = "Unknown";
    }

    var link = document.createElement('td');
    link.innerHTML = '<a href="' + item.link + '" target="_blank">' + item.title + '</a>';
    tr.appendChild(date);
    tr.appendChild(type);
    tr.appendChild(site);
    tr.appendChild(author);
    tr.appendChild(link);
    table.appendChild(tr);
  });
}
/**
 * Here we added the wait until the page is loaded code...
 */
document.addEventListener("DOMContentLoaded", function (event) {
  preventSubmitwithEnter();
  setValuesFromURL(document.URL);
  submitWithEnterInTextbox();
  submitWithButton();
  submitWithEnterInStart();
  submitWithEnterInEnd();
  executeSearch();
});