var CandidateModel = Backbone.Model.extend({
  defaults: {
    name: '',
    votes: 0
  }
});

var Ballot = Backbone.Collection.extend({
  model: CandidateModel,

  addCandiate: function(){

  }
});





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