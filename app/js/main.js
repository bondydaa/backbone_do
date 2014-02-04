$(document).ready(function(){

var CandidateModel = Backbone.Model.extend({
  defaults: {
    votes: 0
  }
});

var BallotCollection = Backbone.Collection.extend({
  model: CandidateModel,
  comparator: 'votes',

  addCandiate: function(model){

  }

});

var ButtonView = Backbone.View.extend({
  events: {
    'click': 'increment'
  },

  increment: function(e){
    var numVotes = this.model.attributes.votes,
        incdVote;
    if(this.$el.hasClass('vote-plus')){
      // this.model.attributes.votes++;
      incdVote = ++numVotes;
      this.model.set({votes: incdVote});
    } else {
      // this.model.attributes.votes--;
      incdVote = --numVotes;
      this.model.set({votes: incdVote});
    }
    this.collection.sort();
    console.log(this.collection);
  }

});

var CandidateView = Backbone.View.extend({
  template: _.template($('#candidate-template').html()),

  initialize: function(){
    this.render();

    // var modelName = this.model.attributes.name;
    // new ButtonView({el: $('#'+modelName+'-upvote'), collection: ballot, model: modelName});
    // new ButtonView({el: $('#'+modelName+'-downvote'), collection: ballot, model: modelName});
    // console.log('#'+modelName+'-upvote');

  },

  render: function(){
    var rendered = this.template(this.model.toJSON());
    this.$el.html(rendered);
    // this.initBtns();
  },

  initBtns: function(){
    // var modelName = this.model.attributes.name;
    // console.log('#'+modelName+'-upvote');
    // new ButtonView({el: $('#'+modelName+'-upvote'), collection: ballot, model: modelName});
    // new ButtonView({el: $('#'+modelName+'-downvote'), collection: ballot, model: modelName});
  }

});



var CountView = Backbone.View.extend({
  template: _.template( $('#vote-counter-tmplt').html() ),

  initialize: function() {
    // this.listenTo(this.model, "change", this.alert);

    this.render();

    this.model.on('change', function(){
      this.render();
    }, this);
  },

  render: function(){
    var rendered = this.template(this.model.toJSON());
    this.$el.html(rendered);
  }

});



var candidate1 = new CandidateModel({name: 'candidate1'});
var candidate2 = new CandidateModel({name: 'candidate2'});
var candidate3 = new CandidateModel({name: 'candidate3'});
var candidate4 = new CandidateModel({name: 'candidate4'});

var ballot = new BallotCollection();

ballot.on('add', function(model){
  var view = new CandidateView({el: $('<li></li>'), model: model});
  $('#ballot').append(view.$el);
});

ballot.add(candidate1);
ballot.add(candidate2);
ballot.add(candidate3);
ballot.add(candidate4);

new ButtonView({el: $('#candidate1-upvote'), collection: ballot, model: candidate1});
new ButtonView({el: $('#candidate1-downvote'), collection: ballot, model: candidate1});
new ButtonView({el: $('#candidate2-upvote'), collection: ballot, model: candidate2});
new ButtonView({el: $('#candidate2-downvote'), collection: ballot, model: candidate2});
new ButtonView({el: $('#candidate3-upvote'), collection: ballot, model: candidate3});
new ButtonView({el: $('#candidate3-downvote'), collection: ballot, model: candidate3});
new ButtonView({el: $('#candidate4-upvote'), collection: ballot, model: candidate4});
new ButtonView({el: $('#candidate4-downvote'), collection: ballot, model: candidate4});

new CountView({el: $('#vote-counter-candidate1'), model: candidate1});
new CountView({el: $('#vote-counter-candidate2'), model: candidate2});
new CountView({el: $('#vote-counter-candidate3'), model: candidate3});
new CountView({el: $('#vote-counter-candidate4'), model: candidate4});

});
