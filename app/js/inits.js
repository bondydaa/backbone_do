var explainations = new ExplainationCollection();

explainations.add({
  "id": 'create',
  "paragraph": "Creating a new event is simple.",
  "listType": "ol",
  "listItems": [
    "Give your event a name (ex: 'Brunch with Bondy', 'Drinks with David')",
    "Set the date and time for when you'd like to do said event",
    "Give the number of people you'll be inviting",
    "Click Let's Do to create your event (You'll set the options for locations next)"
  ]
});
explainations.add({
  "id": "locations",
  "paragraph": "Once your event has been created you'll need to add options for your friends to vote on. Most often these will be locations.",
  "listType": "ol",
  "listItems": [
    "To enter a new location type the name into the input field (ex: 'My Place', 'Ann Sather on Belmont', 'Headquarters')",
    "You can add a maximum of 4 locations and need at least 2 location (or else why do you need to vote??)",
    "Once you've set your locations, click 'Add Locations' to continue"
  ]
});
explainations.add({
  "id": "invite",
  "paragraph": "Now that your ballot is created you'll want to send it to some friends. Be sure to review your details to make sure they are correct.",
  "listType": "ol",
  "listItems": [
    "To send to your friends all you'll need to do is copy the link provided and text or email it to them.",
    "Since this is a unique url you and your friends will be taken directly to the voting page"
  ]
});
explainations.add({
  "id": "vote",
  "paragraph": "Here is where the magic happens. You and your fiends can vote on locations to quickly make a decision. The location that gets a majority of the votes will be the winner. If no location receives a majority vote 30 minutes prior to the start of your event then the location with the most votes will be the winner. You and your friends will be notified once either condition is met."
});

var app = new AppView();

var router = new ExplainRouter();

Backbone.history.start({pushState: true});

var $tabs = $('.tabs');

$tabs.on('click', function(e){
  e.preventDefault();
  var hrefCall = $(e.target).attr('href');
  $tabs.find('.active').removeClass('active');
  console.log(hrefCall);
  $tabs.find('[href='+hrefCall+']').parent().addClass('active');
  router.navigate(hrefCall, {trigger: true});
});