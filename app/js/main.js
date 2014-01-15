var VoteModel = Backbone.Model.extend({
  defaults: {
    votes: 0
  }

});

var VoteList = Backbone.Collection.extend({
  model: VoteModel
});


var CountView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  events: {
    "click": "vote"
  },
  vote: function(){
    console.log(this);
    if($(this).hasClass('add')){
      alert('clicked');
    }
  }
});


var voteList = new VoteList();
var $items = $('button');

new CountView({el: $items, collection: voteList})