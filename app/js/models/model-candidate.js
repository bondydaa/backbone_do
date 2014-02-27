var CandidateModel = Backbone.Model.extend({
  defaults: {
    votes: 0
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