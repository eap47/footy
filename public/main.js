

var selectedClub = [];
var clubname = $(document).find("title").text();
var test = [];



document.body.style.background = "url('/bck/" + clubname + ".jpg') no-repeat center fixed";
document.body.style.backgroundSize = "cover";


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
      $('.teamDetails').empty();
      var source = $('#teamDetails-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template(selectedClub);
      $('.teamDetails').append(newHTML);
      document.getElementById('night-life').style.background = "linear-gradient(to bottom right, " + selectedClub.color1 + ", " + selectedClub.color2 + ")";
      document.getElementById('stadium').style.background = "url('/stadiums/" + selectedClub.FDCOUK + ".jpg') no-repeat center";

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
      console.log(players);
      $('.players').empty();
      for (var i = 0; i < players.length; i++) {

        var source = $('#squadPlayer').html();
        var template = Handlebars.compile(source);
        var newHTML = template(players[i]);
        $('.players').append(newHTML);

      }

      trophyDrawer();
      fetchFixtures();
    }
  });
}

var fetchFixtures = function() {
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
