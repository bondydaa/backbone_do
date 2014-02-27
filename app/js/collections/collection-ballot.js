var BallotCollection = Backbone.Collection.extend({
  model: CandidateModel,
  comparator: 'votes',

  initialize: function(){
    this.on('sort', function(){
      this.totalVotes();
    }, this);
  },

  addCandiate: function(newLocation){
    this.add({name: newLocation});
  },

  totalVotes: function(){
    var totalVotes = 0;
    $.each(this.models, function(index, model){
      var modelVotes = model.get('votes');
      totalVotes += modelVotes;
    });
  }

});