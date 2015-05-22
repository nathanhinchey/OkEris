;(function(){
	"use strict";
	AlrightEros.Routers.Messages = Backbone.Router.extend({
		initialize: function (options) {
			this.$bodyEl = options.$bodyEl;
			this.$headerEl = options.$headerEl;
			AlrightEros.messages = new AlrightEros.Collections.Messages();
			AlrightEros.messages.fetch();
		},

		routes: {
			"messages" : "index",
			"messages/:userId" : "show",
			"messages/:userId/new" : "new"
		},

		index: function(){
			this._swapContentHeaderView();
			AlrightEros.messages.fetch();
			var indexView = new AlrightEros.Views.MessagesIndex({
				collection: AlrightEros.messages
			});
			this._swapContentBodyView(indexView);
		},

		show: function(userId){
			this._swapContentHeaderView();
			window.messages;
			var messageArray;

			AlrightEros.messages.fetch({
				success: function (){
					messageArray = AlrightEros.messages.where({
						other_user: Number(userId)
					});
					window.messages.set(messageArray);
				}
			})

			window.messages = new AlrightEros.Collections.Messages();

			var conversationView = new AlrightEros.Views.MessagesIndex({
				collection: window.messages
			})

			this._swapContentBodyView(conversationView);

		},

		new: function(userId){

		}
	})
})();
