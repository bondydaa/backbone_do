(function ($, global) {
$(document).ready(function(){

var CandidateModel = Backbone.Model.extend({
  defaults: {
    votes: 0,
    voting: false
  },

  inc: function(){
    this.set('votes', this.get('votes')+1);
    console.log(this.collection);
    this.collection.sort();
  },

  dec: function(){
    this.set('votes', this.get('votes')-1);
    console.log(this.collection);
    this.collection.sort();
  }

});

var ExplainationModel = Backbone.Model.extend({
  defaults: {
    id: "",
    paragraph: "",
    listType: "",
    listItems: []
  }
});

var BallotCollection = Backbone.Collection.extend({
  model: CandidateModel,
  comparator: 'votes',

  initialize: function(){
    this.on('sort', function(){
      this.totalVotes();
    }, this);

    this.on('add', function(model){
      var view = new CandidateView({el: $('<div></div>'), model: model});
      $('#ballot').append(view.$el);
    });
  },

  addCandiate: function(newCandidate){
    this.add({name: newCandidate});
  },

  totalVotes: function(){
    var totalVotes;

    $.each(this.models, function(index, model){
      var modelVotes = model.get('votes');
      totalVotes += modelVotes;
    });
  }

});

var ExplainationCollection = Backbone.Collection.extend({
  model: ExplainationModel

});

var AddCandidate = Backbone.View.extend({
  template: $('#create-ballot-candidate-template').html(),

  initialize: function(){
    var ballot = new BallotCollection();
    this.render(ballot);
  },

  render: function(ballot){
    this.$el.html(this.template);
    var newCandidateView = new FormView({el: $('#add-candidate-form'), collection: ballot});
  }

});

var AppView = Backbone.View.extend({
  el: '#main',

  newEventTemplate: $('#new-event-template').html(),
  addLocationsTemplate: $('#add-candidate-template').html(),

  initialize: function(){
    var self = this;
    this.$el.html(this.newEventTemplate);

    $('#new-event').on('submit', function(e){
      e.preventDefault();
      self.createBallot();
    });
  },

  render: function(){

  },

  createBallot: function(){
    var hash = Math.random().toString(36).substr(2, 5); //cuts '0.' from hash, sets it to 5 characters
    router.navigate("createBallot/"+hash, {trigger: true});

    var addCandidate = new AddCandidate({el: this.el});

  }

});

var CandidateView = Backbone.View.extend({
  template: _.template($('#candidate-template').html()),

  events: {
    'click .vote-plus' : 'increment',
    'click .vote-minus' : 'decrement',
    'dblclick': 'editName'
  },

  remove: function(){
    self.countview.remove();
    return Backbone.View.prototype.remove.call(this);
  },

  increment: function(){
    this.model.inc();
  },

  decrement: function(){
    this.model.dec();
  },

  editName: function(){

  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var rendered = this.template(this.model.toJSON());
    this.$el.html(rendered);
    var model = this.model,
        self = this;
    setTimeout(function(){
      self.countivew = new CountView({el: '#vote-counter-'+model.get('name'), model: model});
    }, 0);
  },

});

var CountView = Backbone.View.extend({
  template: _.template( $('#vote-counter-tmplt').html() ),

  initialize: function() {
    this.render();

    this.model.on('change', function(){
      this.render();
    }, this);
  },

  render: function(){
    var rendered = this.template(this.model.toJSON());
    console.log(this.model.toJSON());
    this.$el.html(rendered);
  }

});

var ExplainationsView = Backbone.View.extend({
  template: _.template( $('#explain-template').html() ),

  initialize: function(){
    this.render();
  },

  render: function(){
    var rendered = this.template(this.model.attributes);
    this.$el.html(rendered);
  }

});

var FormView = Backbone.View.extend({
  events: {
    'submit': 'addNewCandidate'
  },

  addNewCandidate: function(){
    var newCandidate = this.$el.find('input').val();
    this.collection.addCandiate(newCandidate);
    this.$el.find('input').val('');
    return false;
  }
});

var ExplainRouter = Backbone.Router.extend({
  routes: {
    ':id': 'createView',
    'createBallot/:hash': 'createNewBallot'
  },

  createView: function(id){
    var model = explainations.get({id: id});
    new ExplainationsView({el: $('.explain'), model: model});
  },

  createNewBallot: function(hash) {


  }

});

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

Backbone.history.start();

var $tabs = $('.tabs');

$tabs.on('click', function(e){
  e.preventDefault();
  var hrefCall = $(e.target).attr('href');
  $tabs.find('.active').removeClass('active');
  console.log(hrefCall);
  $tabs.find('[href='+hrefCall+']').parent().addClass('active');
  router.navigate(hrefCall, {trigger: true});
});

});
})(jQuery, this);