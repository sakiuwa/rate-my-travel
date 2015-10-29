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

	review.set('title', $('#title').val());
	review.set('rating', rating);
	review.set('body', $('#body').val());

	review.save(null, {
        success: getData
    });

    review.set('title', '');
	review.set('body', '');
	
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
	console.log(count);
	for (i in data) {
		sum += data[i];
		count += 1;
		console.log(count);
	}
	averageRating = sum / count;
	// console.log(sum);
	// console.log(averageRating);
}


// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('#list').empty();
	// Loop through your data, and pass each element to the addItem function
    for (i in data) {
        addItem(data[i]);
    }
    /* data.forEach(functions(d) {
        addItem(d);
    }); */
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
    var title = item.get('title');
    var review = item.get('body');
    var starScore = item.get('rating');
    //var song = item.get('song');

	// Append li that includes text from the data item
    var li = $('<li>' + title + ', ' + review  + '</li>');
    var starRating = $('#ave-star').raty({
		readOnly: true,
		score : starScore
	});
	// console.log(starRating);
    var button = $("<button class='btn-danger btn-xs'><span class='glyphicon'>Remove</span></button>'");
    button.click(function() {
        item.destroy({
            success:getData
        });
    });
    li.append(starRating);
    li.append(button);
    $('#list').append(li);

	// Time pending, create a button that removes the data item on click
}

// Call your getData function when the page loads
getData();
getRatings();

$('#ave-star').raty({
	readOnly: true,
	noRatedMsg : "Not rated yet!"
});











