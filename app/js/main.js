$(document).ready(function(){

var CandidateModel = Backbone.Model.extend({
  defaults: {
    votes: 0
  },

  inc: function(){
    this.set('votes', this.get('votes')+1);
  },

  dec: function(){
    this.set('votes', this.get('votes')-1);
  }

});

var BallotCollection = Backbone.Collection.extend({
  model: CandidateModel,
  comparator: 'votes',

  addCandiate: function(newLocation){
    this.add({name: newLocation});
  }

});


var CandidateView = Backbone.View.extend({
  template: _.template($('#candidate-template').html()),

  events: {
    'click .vote-plus' : 'increment',
    'click .vote-minus' : 'decrement'
  },

  remove: function(){
    self.countview.remove();
    return Backbone.View.prototype.remove.call(this);
  },

  increment: function(){
    this.model.inc();

  },

  decrement: function(){
    this.model.dec();

  },

  initialize: function(){
    this.render();
  },

  render: function(){
    var rendered = this.template(this.model.toJSON());
    this.$el.html(rendered);
    var model = this.model,
        self = this;
    setTimeout(function(){
      self.countivew = new CountView({el: '#vote-counter-'+model.get('name'), model: model});
      console.log( $('#vote-counter-one').length );
    }, 0);

  },

});


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

var ballot = new BallotCollection();

var newLocationView = new FormView({el: "form", collection: ballot})

ballot.on('add', function(model){
  var view = new CandidateView({el: $('<li></li>'), model: model});
  $('#ballot').append(view.$el);
});


});
