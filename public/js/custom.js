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
    var end = new Date().addDays(1);
    end = end.toISOString().split('T')[0];
    setValue('start', start);
  }
  if (urlParam.has('end')) {
    setValue('end', urlParam.get('end'));
  } else {
    var end = new Date().addDays(1);
    end = end.toISOString().split('T')[0];
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
$(function () {
  $('[data-toggle="popover"]').popover();
});

function parseResponse(responseObj) {
  console.log(responseObj);
  var table = document.getElementById('newsTable');
  var news = responseObj.filteredFeeds;
  if (news.length === 0) { }
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
    var groups = {
      patron: "🌟",
      devmvp2020: "🔥",
      employee: "🎉"
    }
    var people = [{
      name: "Andrew Albury-Dor",
      aliases: [],
      hoverText: "Andrew thank you for being a patron of this work!",
      groups: ["devmvp2020", "patron"]
    }, {
      name: "Kevin Clark",
      aliases: ["kevclark"],
      hoverText: "Kevin thank you for being a patron of this work!",
      groups: ["patron"]
    }, {
      name: "Alex Darby",
      aliases: ["amullendarby"],
      hoverText: "Alex thank you for being a patron of this work!",
      groups: ["patron"]
    }, {
      name: "Earl Duque",
      aliases: ["eduque"],
      hoverText: "Earl thank you for doing you're awesome stuff with Slackbot, your blog and inspiring us.",
      groups: ["devmvp2020"]
    }, {
      name: "gauravchoudhury",
      aliases: [],
      hoverText: "",
      groups: ["devmvp2020"]
    }, {
      name: "Jarod Mundt",
      aliases: ["jarodm"],
      hoverText: "Jarod thank you!",
      groups: ["devmvp2020"]
    }, {
      name: "Jim Coyne",
      aliases: [],
      hoverText: "Jim Coyne thank you!",
      groups: ["devmvp2020"]
    }, {
      name: "Kalaiarasan Pushpanathan",
      aliases: [],
      hoverText: "Thank you Kalai!  TIL is great!",
      groups: ["devmvp2020"]
    }, {
      name: "Mark Roethof",
      aliases: [],
      hoverText: "Mark Roethof, your content is amazing!",
      groups: ["devmvp2020"]
    }, {
      name: "Mark Scott",
      aliases: [],
      hoverText: "Mark, your contributions are loved!  Works at ServiceNow.",
      groups: ["devmvp2020", "employee"]
    }, {
      name: "Nathan Firth",
      aliases: ["nathanfirth"],
      hoverText: "Founder of New Rocket, you are great!",
      groups: ["devmvp2020"]
    }, {
      name: "Robert Fedoruk",
      aliases: [],
      hoverText: "Robert Fedoruk, you're content drives action.  It's so refreshing!",
      groups: ["devmvp2020"]
    }, {
      name: "Travis Toulson",
      aliases: ["tltoulson"],
      hoverText: "How did you learn to write like that!  Amazing!",
      groups: ["devmvp2020"]
    }, {
      name: "Andrew Pishchulin",
      aliases: [],
      hoverText: "Andrew P, he's sharp!",
      groups: ["devmvp2020"]
    }, {
      name: "Jace Benson",
      aliases: ["jacebenson"],
      hoverText: "I mean, Thanks self!",
      groups: ["devmvp2020"]
    }, {
      name: "Chuck Tomasi",
      aliases: ["ctomasi"],
      hoverText: "This man is non-stop!  Works at ServiceNow.",
      groups: ["employee"]
    }, {
      name: "Andrew Barnes",
      aliases: ["Andrew Barnes - AJB"],
      hoverText: "Advocating for the Deveopers.  Works at ServiceNow.",
      groups: ["employee"]
    }, {
      name: "Brad Tilton",
      aliases: ["btilton"],
      hoverText: "He makes grilled goods.  Works at ServiceNow.",
      groups: ["employee"]
    }, {
      name: "SlightlyLoony",
      aliases: [],
      hoverText: "One of the original.  Thank you!",
      groups: ["employee"]
    }];

    if (item.author) {
      if (item.author.indexOf(',') >= 0) {//multiple authors...
        people.forEach(function (personObj) {
          var authorsArr = item.author.split(',');
          authorsArr.forEach(function(coauthor){
            if(coauthor == personObj.name || personObj.aliases.includes(coauthor)){
              if (personObj.groups.includes("patron")) {
              author.classList.add('bg-primary'); // text-white');
              author.classList.add('text-white'); // text-white');
              author.classList.add('rounded'); // text-white');
              }  
              author.setAttribute("data-toggle", "popover");
            author.setAttribute("data-trigger", "hover");
            author.setAttribute("title", personObj.hoverText);
            author.setAttribute("data-content", personObj.hoverText);
            var flair = personObj.groups.map(function (flair) {
              return groups[flair];
            }).join('');
            item.author = flair + item.author + flair
            }
          });

          if (item.author == personObj.name || personObj.aliases.includes(item.author)) {
            if (personObj.groups.includes("patron")) {
              author.classList.add('bg-primary'); // text-white');
              author.classList.add('text-white'); // text-white');
              author.classList.add('rounded'); // text-white');
            }
            author.setAttribute("data-toggle", "popover");
            author.setAttribute("data-trigger", "hover");
            author.setAttribute("title", personObj.hoverText);
            author.setAttribute("data-content", personObj.hoverText);
            var flair = personObj.groups.map(function (flair) {
              return groups[flair];
            }).join('');
            item.author = flair + item.author + flair
          }
        });
      } else {
        people.forEach(function (personObj) {
          if (item.author == personObj.name || personObj.aliases.includes(item.author)) {
            if (personObj.groups.includes("patron")) {
              author.classList.add('bg-primary'); // text-white');
              author.classList.add('text-white'); // text-white');
              author.classList.add('rounded'); // text-white');
            }
            author.setAttribute("data-toggle", "popover");
            author.setAttribute("data-trigger", "hover");
            author.setAttribute("title", personObj.hoverText);
            author.setAttribute("data-content", personObj.hoverText);
            var flair = personObj.groups.map(function (flair) {
              return groups[flair];
            }).join('');
            item.author = flair + item.author + flair
          }
        });
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