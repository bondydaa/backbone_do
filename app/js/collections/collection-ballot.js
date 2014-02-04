(function(){

var BallotCollection = Backbone.Collection.extend({
  model: CandidateModel,

  addCandiate: function(){

  },

  sortCandidates: function(){
    this.sortBy(votes);
  }
});

}());
