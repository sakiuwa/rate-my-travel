// Initialize Parse app
Parse.initialize("w2ZOdACKB8ovedsTQne2DonK4rFHmZDZjb2O4EIG", "vpFVJ3Zt9TMKRiPFyn1n9tcDh7WWq43QuHAceYjy");
var rating;
var totalScore;
var count;


$('#ave-star').raty({
	readOnly: true,
	noRatedMsg: "Not yet rated!"
});
$('#star').raty({
	click: function(score) {
		rating = parseInt(score, 10);
	}
});


var Reviews = Parse.Object.extend('Reviews');

var review = new Reviews();

$('form').submit(function() {
	var review = new Reviews();

	review.set('title', $('#title').val());
	review.set('rating', rating);
	review.set('body', $('#body').val());
	review.set('good', 0);
	review.set('bad', 0);

	$('#title').val('');
	$('#body').val('');
	$('#star').raty('score', 0);

	review.save(null, {
        success: getData
    });
	
	return false;
})



// Write a function to get data
var getData = function() {

	// Set up a new query for our Music class
    var query = new Parse.Query(Reviews);

	// Set a parameter for your query -- where the website property isn't missing
    // query.notEqualTo('title', '');
    query.notEqualTo('rating', null);
    query.descending("good");

    query.find({
        success: function(results) {
            buildList(results);
        }
    })
}

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('.list-group').empty();
		// Loop through your data, and pass each element to the addItem function
	totalScore = 0;
	count = data.length;

    for (i in data) {
        addItem(data[i]);
    }
    aveScore = totalScore / count;
    $('#ave-star').raty({
    	score: aveScore
    });
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
    var title = item.get('title');
    var body = item.get('body');
    var starScore = item.get('rating');
    var good = item.get('good');
    var bad = item.get('bad');
    totalScore += starScore;

    var reviewRating = $("<p>" + good + " out of " + (good + bad) + " people found this review helpful.</p>")

    var button = $("<button class='btn-danger btn-xs'><span class='glyphicon'>Delete</span></button>'");
    button.click(function() {
        item.destroy({
            success: getData()
        });
    });

    var up = $("<button class='btn-default btn-xs'><i class='fa fa-thumbs-o-up'></i></button>");
    up.click(function() {
    	item.increment('good');
    	item.save(null, {
    		success: getData()
    	});
    })
    var down = $("<button class='btn-default btn-xs'><i class='fa fa-thumbs-o-down'></i></button>");
    down.click(function() {
    	item.increment('bad');
    	item.save(null, {
    		success: getData()
    	});
    })

    var li2 = $("<li class='list-group-item'>");
    var reviewTitle = $("<h4 class='list-title'>" + title + "</h4>");
    var reviewStar = $(document.createElement('div')).raty({
    	readOnly: true,
    	score : starScore
    });
    var reviewBody = $("<p class='list-body'>" + body + "</p></li>");

    li2.append(reviewTitle);
    li2.append(reviewStar);
    li2.append(reviewBody);
    li2.append(reviewRating);
    li2.append(button);
    li2.append(up);
    li2.append(down);

    $('.list-group').append(li2);
	// Time pending, create a button that removes the data item on click
}

var updateUp = function(itemID, good) {
	var query = new Parse.Query(Reviews);
	query.equalTo('objectID', itemID);
	query.each(function(item) {
		console.log(item.get('good'));
		item.set('good', good + 1);
	})
};


// Call your getData function when the page loads
getData();









