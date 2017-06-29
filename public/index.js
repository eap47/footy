

var selectedClub = [];
var clubname = 'Liverpool';
var test = [];


var fetchTeam = function() {
  var clubs = [];

  $.ajax({
    url: '/epl/clubs.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      clubs = data;

      for (var i = 0; i < clubs.length; i++) {
        if (clubs[i].FDCOUK === clubname) {
          selectedClub = clubs[i];
          console.log(selectedClub);

        }
      }
      // $('.teamDetails').empty();
      // var source = $('#teamDetails-template').html();
      // var template = Handlebars.compile(source);
      // var newHTML = template(selectedClub);
      // $('.teamDetails').append(newHTML);
      // document.getElementById('night-life').style.background = "linear-gradient(to bottom right, " + selectedClub.color1 + ", " + selectedClub.color2 + ")";
      // document.getElementById('stadium').style.background = "url('/stadiums/" + selectedClub.FDCOUK + ".jpg') no-repeat center";

      fetchSquad();
    }
  });

};

var fetchSquad = function() {
  var source = $('#statColumns-template').html();
  var template = Handlebars.compile(source);
  var newHTML = template(selectedClub);
  $('.statsRow').append(newHTML);

  $.ajax({
    headers: { 'X-Auth-Token': '39d5903e73c34ce2bdcbd0d280f3765f' },
    url: 'http://api.football-data.org/v1/teams/' + selectedClub.TID + '/players',
    dataType: 'json',
    type: 'GET',
    success: function(data) {

      var players = data.players;
      // console.log(players);
      // $('.players').empty();
      // for (var i = 0; i < players.length; i++) {

      //   var source = $('#squadPlayer').html();
      //   var template = Handlebars.compile(source);
      //   var newHTML = template(players[i]);
      //   $('.players').append(newHTML);

      // }
      fetchTable();
      trophyDrawer();
      fetchFixtures1();
      buttonBinding();
 
    }
  });
}

var fetchFixtures1 = function() {
  $.ajax({
    headers: { 'X-Auth-Token': '39d5903e73c34ce2bdcbd0d280f3765f' },
    url: 'http://api.football-data.org/v1/teams/' + selectedClub.TID + '/fixtures',
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      var fixtures = data.fixtures;
      console.log(fixtures);
      $('.fixtures').empty();
      for (var i = 0; i < 10; i++) {
        fixtures[i].date = fixtures[i].date.slice(0, 10);
        var source = $('#fixtures').html();
        var template = Handlebars.compile(source);
        var newHTML = template(fixtures[i]);
        $('.fixtures').append(newHTML);

      }

    }
  });
}


var trophyDrawer = function() {
  $('#epltrophies').empty();
  $('#factrophies').empty();
  $('#efltrophies').empty();
  $('#ucltrophies').empty();
  $('#ueltrophies').empty();
  for (var i = 0; i < selectedClub.EPL; i++) {
    $('#epltrophies').append('<img class="trophyIcon" src="/trophies/epl.png">');
  }
  for (var j = 0; j < selectedClub.FAC; j++) {
    $('#factrophies').append('<img class="trophyIcon" src="/trophies/fac.png">');
  }
  for (var i = 0; i < selectedClub.LC; i++) {
    $('#efltrophies').append('<img class="trophyIcon" src="/trophies/efl.png">');
  }
  for (var i = 0; i < selectedClub.UCL; i++) {
    $('#ucltrophies').append('<img class="trophyIcon" src="/trophies/ucl.png">');
  }
  for (var i = 0; i < selectedClub.UEL; i++) {
    $('#ueltrophies').append('<img class="trophyIcon" src="/trophies/uel.png">');
  }
}

var fetchTable = function() {
  
  $.ajax({
    headers: { 'X-Auth-Token': '39d5903e73c34ce2bdcbd0d280f3765f' },
    url: 'http://api.football-data.org/v1/competitions/445/leagueTable',
    dataType: 'json',
    type: 'GET',
    success: function(data) {

      var standing = data.standing;

      for (var i = 0; i < standing.length; i++) {
        var source = $('#table-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(standing[i]);
        $('.table').append(newHTML);
      }
    }
  });
}

var buttonBinding = function() {
$('#mySubmit').on('click', function() {
  var teamA = $(this).siblings('#selTeamA').val();
  var teamB = $(this).siblings('#selTeamB').val();
  var fromY = $(this).siblings('#selYearFrom').val();
  var fromM = $(this).siblings('#selMonthFrom').val();
  var fromD = $(this).siblings('#selDayFrom').val();
  var toY = $(this).siblings('#selYearTo').val();
  var toM = $(this).siblings('#selMonthTo').val();
  var toD = $(this).siblings('#selDayTo').val();
  var dateFrom = fromM+"/"+fromD+"/"+fromY;
  var dateTo = toM+"/"+toD+"/"+toY;
  homepageStyling();
  fetchFixtures(teamA, teamB, dateFrom, dateTo);
});
}

var homepageStyling = function () {
  document.getElementById("boom").classList.add('hidden');
  document.getElementById("boom").classList.remove('visible');
  document.getElementById("boom").style.display="none";
  document.getElementById("boom1").style.display="none";
  document.body.style.background = "url('/bck/search.jpg') no-repeat center fixed";
  document.body.style.backgroundSize = "cover";
  document.getElementById("boom2").style.width="100%";
  document.getElementById("chartfield").style.backgroundColor="#EAFF04";
  }


// var fetchNewsHomePage = function () {
 

//   $('#IDETEDD').empty();
//   $.ajax({
//     url: 'https://newsapi.org/v1/articles?source=four-four-two&sortBy=top&apiKey=9a8e2533e95a4c23a5bf8dd92b52edfa',
//     dataType: 'json',
//     type: 'GET',
//     success: function(data) {


//    console.log(data);
//      var articles = data.articles;
//      for (var i = 0; i < articles.length; i++) {
//       var source = $('#news-template').html();
//       var template = Handlebars.compile(source);
//       var newHTML = template(articles[i]);
//     $('#IDETEDD').append(newHTML);
//      }
//     }
//   });


// }

function initMap() {
  var uluru = { lat: 53.430819, lng: -2.960828 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

fetchTeam();
trophyDrawer();
buttonBinding();
