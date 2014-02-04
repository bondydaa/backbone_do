$(document).ready(function(){

var CountView = Backbone.View.extend({
  template: _.template( $('#vote-counter-tmplt').html() ),

  initialize: function() {
    // this.listenTo(this.model, "change", this.alert);

    this.render();

    this.model.on('change', function(){
      this.render();
    }, this);
  },

  render: function(){
    var rendered = this.template(this.model.toJSON());
    this.$el.html(rendered);
  }

});

}());
