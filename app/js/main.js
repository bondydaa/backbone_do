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
    if(this.$el.hasClass('vote-plus')){
      this.model.attributes.votes++;
    } else {
      this.model.attributes.votes--;
    }
  }
});

var CountView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.render());
  },
  render: function(){
    console.log(this.model)
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

/*
var leVote = {
  ballot: [
    {
      name: 'element1',
      $el: $('#opt1'),
      $iterators: $('.iter1'),
      votes: 0,
      $voteCounter: $('#vote-counter1')
    },
    {
      name: 'element2',
      $el: $('#opt2'),
      $iterators: $('.iter2'),
      votes: 0,
      $voteCounter: $('#vote-counter2')
    },
    {
      name: 'element3',
      $el: $('#opt3'),
      $iterators: $('.iter3'),
      votes: 0,
      $voteCounter: $('#vote-counter3')
    },
    {
      name: 'element4',
      $el: $('#opt4'),
      $iterators: $('.iter4'),
      votes: 0,
      $voteCounter: $('#vote-counter4')
    }
  ],
  increment: function(object){
    var voteCount = object.votes;
    voteCount++;
    $.extend(object, {votes: voteCount});
    $(window).trigger('vote');
  },
  decrement: function(object){
    var voteCount = object.votes;
    voteCount--;
    $.extend(object, {votes: voteCount});
    $(window).trigger('vote');
  },
  init: function(){

    $.each(this.ballot, function(index, value){
      var object = leVote.ballot[index];
      value.$iterators.on('click', function(){
        if($(this).hasClass('vote-plus')) {
          leVote.increment(object);
        } else {
          leVote.decrement(object);
        }
      });
    });

    $(window).on('vote', function(){
      $.each(leVote.ballot, function(i, candidate){
        var object = leVote.ballot[i];
        candidate.$voteCounter.text(object.votes);
      });
    });

  }
};

leVote.init();
*/