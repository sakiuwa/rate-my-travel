// Initialize Parse app
Parse.initialize("w2ZOdACKB8ovedsTQne2DonK4rFHmZDZjb2O4EIG", "vpFVJ3Zt9TMKRiPFyn1n9tcDh7WWq43QuHAceYjy");
var rating;
var averageRating;

$('#star').raty({
	click: function(score) {
		rating = parseInt(score, 10);
		// alert(rating);
	}
});


var Reviews = Parse.Object.extend('Reviews');

var review = new Reviews();

$('form').submit(function() {
	var review = new Reviews();
	var text = $('#body').val();

	review.set('title', $('#title').val());
	review.set('rating', rating);
	review.set('body', text);

	review.save(null, {
        success: getData
    });

    review.set('title', '');
	review.set('body', '');
	$('#title').val('');
	$('#body').val('');
	
	return false
})



// Write a function to get data
var getData = function() {

	// Set up a new query for our Music class
    var query = new Parse.Query(Reviews);

	// Set a parameter for your query -- where the website property isn't missing
    // query.notEqualTo('title', '');

    query.find({
        success: function(results) {
            buildList(results);
        }
    })
}

var getRatings = function() {
	var query = new Parse.Query(Reviews);
	query.equalTo('rating');
	query.find({
		success: function(results) {
			getAverage(results);
		}
	});
}

var getAverage = function(data) {
	var sum = 0;
	var count = 0;
	for (i in data) {
	}
	averageRating = sum / count;
}


// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('#list-body').empty;
		// Loop through your data, and pass each element to the addItem function
    for (i in data) {
        addItem(data[i]);
        console.log(data[i]);
    }
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
    var title = item.get('title');
    var body = item.get('body');
    var starScore = item.get('rating');
    //var song = item.get('song');

	// Append li that includes text from the data item
    var starRating = $('.starDisp').raty({
		readOnly: true,
		score : item.get('rating')
	});
    var button = $("<button class='btn-danger btn-xs'><span class='glyphicon'>Delete</span></button>'");
    button.click(function() {
        item.destroy({
            success: getData()
        });
    });

    var li2 = $("<li class='list-group-item'>");
    var reviewTitle = $("<h4 class='list-title'>" + title + "</h4>");
    var reviewStar = $("<div class='starDisp'></div>");
    var reviewBody = $("<p class='list-body'>" + body + "</p></li>");

    li2.append(reviewTitle);
    li2.append(reviewStar);
    li2.append(reviewBody);
    li2.append(button);

    $('.list-group').append(li2);


	// Time pending, create a button that removes the data item on click
}

// Call your getData function when the page loads
getData();
getRatings();

$('.ave-star').raty({
	readOnly: true,
	score : 3
});











