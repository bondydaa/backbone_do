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