var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://live.staticflickr.com/1231/830828858_eebeb20aa7_m.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://farm9.staticflickr.com/8192/29575773696_fb31e6105d_m.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://live.staticflickr.com/30/42760375_4191866860_m.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!");
});
data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err)
        } else {
            console.log("added a campground");
            Comment.create(
                {
                    text:"This place is great",
                    author: "Homer"
                }, function(err, comment){
                     campground.comments.push(comment);
                     campground.save();
                     console.log("Created new comment");
                });
        }
    });
}); 
}

module.exports = seedDB;