var AppView = Backbone.View.extend({
  el: '#main',

  newEventTemplate: $('#new-event-template').html(),
  addLocationsTemplate: $('#add-locations-template').html(),

  initialize: function(){
    var self = this;
    this.$el.html(this.newEventTemplate);

    $('#new-event').on('submit', function(e){
      e.preventDefault();
      self.createBallot();
    });
  },

  render: function(){

  },

  createBallot: function(){
    var hash = Math.random().toString(36).substr(2, 5); //cuts '0.' from has, sets it to 5 characters
    router.navigate("createBallot/"+hash, {trigger: true});

    var addLocView = new AddLocToBallot({el: this.el});

  }

});