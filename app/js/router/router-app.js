var ExplainRouter = Backbone.Router.extend({
  routes: {
    ':id': 'createView',
    'createBallot/:hash': 'createNewBallot'
  },

  createView: function(id){
    var model = explainations.get({id: id});
    new ExplainationsView({el: $('.explain'), model: model});
  },

  createNewBallot: function(hash) {

  }

});