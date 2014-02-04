(function(){

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

}());
