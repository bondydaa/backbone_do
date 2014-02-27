var ExplainationsView = Backbone.View.extend({
  template: _.template( $('#explain-template').html() ),

  initialize: function(){
    this.render();
  },

  render: function(){
    var rendered = this.template(this.model.attributes);
    this.$el.html(rendered);
  }

});