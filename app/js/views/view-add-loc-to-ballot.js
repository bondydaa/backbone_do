var AddCandidate = Backbone.View.extend({
  template: $('#add-candidate-template').html(),

  initialize: function(){
    var ballot = new BallotCollection();
    this.render(ballot);
  },

  render: function(ballot){
    this.$el.html(this.template);
    var newCandidateView = new FormView({el: $('#add-candidate-form'), collection: ballot});
  }

});