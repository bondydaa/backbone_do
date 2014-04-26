var FormView = Backbone.View.extend({
  events: {
    'submit': 'addNewCandidate'
  },

  addNewCandidate: function(){
    var newCandidate = this.$el.find('input').val();
    this.collection.addCandiate(newCandidate);
    this.$el.find('input').val('');
    return false;
  }
});