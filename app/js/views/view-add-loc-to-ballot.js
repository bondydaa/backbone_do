var AddLocToBallot = Backbone.View.extend({
  template: $('#add-locations-template').html(),

  initialize: function(){
    var ballot = new BallotCollection();
    this.render(ballot)
  },

  render: function(ballot){
    this.$el.html(this.template);
    var newLocationView = new FormView({el: $('#add-location-form'), collection: ballot});
  }

});