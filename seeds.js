var mongoose=require("mongoose");
var Campground=require("./models/campground.js");
var comment =require("./models/comment");
var data =[
  {
    name:"Cloud's Rest",
    image:"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    name:"accdss",
    image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
]

function seedDB(){
  Campground.remove({},function(err){
    if(err)
    {
      console.log(err);
    }
    console.log("removed campgrounds");
  });
  data.forEach(function(seed){
    Campground.create(seed,function(err,campground){
      if(err)
      {
        console.log(err);
      }else {
        console.log("added a new campground");
        comment.create({
          text:"this place is great",
          author:"homer"
        },function(err,comment){
          if(err)
          {
            console.log(err);
          }
          else {
            campground.comments.push(comment);
            campground.save();
            console.log("created a new comment");
          }

        });
      }
    });
  });
}
module.exports =seedDB;
