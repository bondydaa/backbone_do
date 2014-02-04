$(document).ready(function(){

var CandidateModel = Backbone.Model.extend({
  defaults: {
    votes: 0
  }
});

var BallotCollection = Backbone.Collection.extend({
  model: CandidateModel,

  addCandiate: function(){

  },

  sortCandidates: function(){
    this.sortBy(votes);
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

var ballot = new BallotCollection([candidate1, candidate2, candidate3, candidate4]);

var button1 = new ButtonView({el: $('#upvote1'), collection: ballot, model: candidate1});
var button2 = new ButtonView({el: $('#downvote1'), collection: ballot, model: candidate1});

var button3 = new ButtonView({el: $('#upvote2'), collection: ballot, model: candidate2});
var button4 = new ButtonView({el: $('#downvote2'), collection: ballot, model: candidate2});

var button5 = new ButtonView({el: $('#upvote3'), collection: ballot, model: candidate3});
var button6 = new ButtonView({el: $('#downvote3'), collection: ballot, model: candidate3});

var button7 = new ButtonView({el: $('#upvote4'), collection: ballot, model: candidate4});
var button8 = new ButtonView({el: $('#downvote4'), collection: ballot, model: candidate4});

var voteCounter1 = new CountView({el: $('#vote-counter1'), collection: ballot, model: candidate1});
var voteCounter2 = new CountView({el: $('#vote-counter2'), collection: ballot, model: candidate2});
var voteCounter3 = new CountView({el: $('#vote-counter3'), collection: ballot, model: candidate3});
var voteCounter4 = new CountView({el: $('#vote-counter4'), collection: ballot, model: candidate4});

});
