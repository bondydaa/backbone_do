var AppView = Backbone.View.extend({
  template: _.template($('#app-template').html()),

  initialize: function(){
    this.render();
  },

  render: function(){
    var rendered = this.template(this.model.attributes);
    this.$el.html(rendered);
  }
});