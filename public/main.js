var fetchTeam = function() {
	var clubs = [];
	var selectedClub="";
	$.ajax({
		url: '/epl/clubs.json',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			clubs = data;
			for (var i=0; i<clubs.length; i++) {
				if (clubs[i].Team === "Liverpool") {
					selectedClub=clubs[i];
					console.log(selectedClub);
				}
			}
		}
	})
	
	
};

fetchTeam();