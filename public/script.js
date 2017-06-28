var selectedFixtures=[];


function fetchFixtures () {


for (var i=0;i<fixtures.length;i++) {
      selectedFixtures.empty();
        if ( (fixtures[i].HomeTeam === teamA || fixtures[i].HomeTeam === teamB)  && (fixtures[i].AwayTeam === teamA || fixtures[i].AwayTeam === teamB) ) {
          selectedFixtures.push(fixtures[i]);
        }
      addResult();
};

function addResult() {
    for (var i=0;i<selectedFixtures.length;i++){
        var sf = selectedFixtures[i]
        if (sf.FTHG > sf.FTAG) {
            sf.result=sf.HomeTeam
        } else if (sf.FTHG < sf.FTAG) {
            sf.result=sf.AwayTeam
        } else {
            sf.result=“draw”
        }
    }
};

function pieChart (result) {
    var teamAhome = {
        teamAwins: 0,
        draws: 0,
        teamBwins: 0
    };
    var teamBhome = {
        teamBwins: 0,
        draws: 0,
        teamAwins: 0
    };
    var total = {
        teamA: 0,
        draws: 0,
        teamB: 0
    };

  for (var i=0;i<selectedFixtures.length;i++) {
        var sf = selectedFixtures;
        if(sf.HomeTeam === teamA && result===teamA){
            teamAhome.teamAwins++;
        } else if (sf.Hometeam === teamA && result === teamB) {
            teamAhome.teamBwins++;
        } else {
            teamAhome.draws++;
        }
    }


    for (var i=0;i<selectedFixtures.length;i++) {
        var sf = selectedFixtures;
        if(sf.AwayTeam === teamA && result===teamA){
            teamAaway.teamAwins++;
        } else if (sf.Awayteam === teamA && result === teamB) {
            teamAaway.teamBwins++;
        } else {
            teamAaway.draws++;
        }
    }

	total.teamA=teamAhome.teamAwins + teamBhome.teamAwins,
    total.draws=teamAhome.draws + teamBhome.draws,
    total.teamB=teamBhome.teamBwins + teamAhome.teamBwins
    };