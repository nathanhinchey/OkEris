;(function(){
	"use strict";
  AlrightEros.Views.ProfilesIndex = Backbone.CompositeView.extend({
    initialize: function (options) {
      // this.listenTo(this.collection, "sync change:username", this.render);
      this.listenTo(this.collection, "add", this.addProfileView);
      this.listenTo(this.collection, "remove", this.removeProfileView);
			this.listenTo(this.collection, "sync", this.render);
			this.searchOptions = options.searchOptions;
			options.page && (this.collection.page = options.page);
			this.collection.fetch({
				data: this.searchOptions
			});
			this.collection.each(this.addProfileView.bind(this));
    },

		events: {
			'click .next': 'next',
			'click .previous': 'previous'
		},

    template: JST['profiles'],

    className: 'profiles-index',

    render: function () {
      var content = this.template({
				moreAfter: true,//this.searchOptions.page,// < this.collection.last_page,
				moreBefore: this.searchOptions.page > 1
			});
      this.$el.html(content);
      this.attachSubviews();
      return this;
    },

    addProfileView: function(profile){
      var subview = new AlrightEros.Views.ProfileSnapshot({model: profile});
      this.addSubview(".profiles-list", subview);
    },

    removeProfileView: function(profile) {
      this.removeModelSubview(".profiles-list", profile);
    },

		next: function (event) {
			event.preventDefault();
			this.searchOptions.page++;
			Backbone.history.navigate(
				"profileindex/" + (this.searchOptions.page),
				{trigger: true}
			)
		},

		previous: function (event) {
			event.preventDefault();
			this.searchOptions.page--;
			Backbone.history.navigate(
				"profileindex/" + (this.searchOptions.page),
				{trigger: true}
			)
		}

  })
})();
