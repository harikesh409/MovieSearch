jQuery(document).ready(function($) {
	$(".search").hide();
	$(".error").hide();
	$(".loading").hide();
	$("."+$("#select").val()).show();
	$("#select").on('change', function(event) {
		$(".error").hide();
		$(".search").hide();
		$("."+$("#select").val()).show();
	});
	$("button").on('click', function(event) {
		event.preventDefault();
		let queryType = $("#select").val();
		if(queryType === "title") {
			let title = $("#title").val();
			if(title == "") {
				$(".t-error").show();
			} else {
				$(".error").hide();
				$(".loading").show();
				fetchData('&t='+title);
			}
		} else if (queryType === "id") { 
			let id = $("#id").val();
			if(id == "") {
				$(".id-error").show();
			} else {
				$(".error").hide();
				$(".loading").show();
				fetchData('&i='+id);
			}
		} else if (queryType === "year") {
			let title = $("#yTitle").val();
			let year = $("#year").val();
			if(year == "") {
				$(".y-error").show();
			} else if(title == "") {
				$(".yt-error").show();
			} else {
				$(".error").hide();
				$(".loading").show();
				fetchData('&t='+title+'&y='+year);
			}
		}
	});
	let fetchData = (params)=>{
		let apikey='';
		let URL=`https://www.omdbapi.com/?&apikey=${apikey}${params}`;
		console.log(URL);
		$.ajax({
			url: URL,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			$(".loading").hide();
			console.log(data);
			let info,image;
			if(data.Response == "True" ) {
				if(data.Poster==="N/A") {
					image = 'default.jpg';
				} else {
					image = data.Poster;
				}
				info = `<tr><td colspan="2" class="text-center"><img src="${image}" alt="${data.Title}" class='img-thumbnail'></td></tr>
				<tr><td>Title</td><td>${data.Title}</td></tr>				    				    
				<tr><td>Actors</td><td>${data.Actors}</td></tr>					      
				<tr><td>Box-Office</td><td>${data.BoxOffice}</td></tr>
				<tr><td>Country</td><td>${data.Country}</td></tr>					      
				<tr><td>Director</td><td>${data.Director}</td></tr>
				<tr><td>Genre</td><td>${data.Genre}</td></tr>					      
				<tr><td>IMDB - ID</td><td>${data.imdbID}</td></tr>
				<tr><td>Rating <i class="fas fa-star text-warning"></i></td><td>${data.imdbRating}/10</td></tr>					      
				<tr><td>Votes <i class="fas fa-thumbs-up text-success"></i></td><td>${data.imdbVotes}</td></tr>`;
			} else {
				info = `<tr><td colspan="2" class="text-center">No movies Found</td></tr>`;
			}
			$("#result>table").html(info);
		})
		.fail(function() {
			$(".loading").hide();
			console.log("error");
			$("#result").html(`<h2 class='text-danger text-center'>Sorry!We were unable to fetch data.</h2>`);
		});
	}
});