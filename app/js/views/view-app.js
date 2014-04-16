var AppView = Backbone.View.extend({
  el: '#main',

  newEventTemplate: $('#new-event-template').html(),

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.newEventTemplate);

    $('#new-event').on('submit', function(){
      this.createBallot();
    });
  },

  createBallot: function(){
    router.navigate("")
  }

});