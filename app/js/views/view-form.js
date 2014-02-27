var FormView = Backbone.View.extend({
  events: {
    'submit': 'addNewLocation'
  },

  addNewLocation: function(){
    var newLocation = this.$el.find('input').val();
    this.collection.addCandiate(newLocation);
    this.$el.find('input').val('');
    return false;
  }
});