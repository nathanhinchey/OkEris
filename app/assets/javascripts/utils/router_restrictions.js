;(function(){
	"use strict";
  Backbone.Router.protoype = _.extend(Backbone.Router.prototype, {
    signIn: function(callback){
      if (!this._requireSignedOut(callback)) { return; }

      // var signInView = new AlrightEros.Views.SignIn({
      //   callback: callback
      // });
      // this._swapContentBodyView(signInView);
      Backbone.history.navigate("/login", {trigger: true})
    },

    _requireSignedIn: function (callback) {
      if (!AlrightEros.currentUser.isSignedIn()) {
        Backbone.history.navigate("/signup", {trigger: true})
        return false;
      }

      return true;
    },

    _requireSignedOut: function(callback){
      if (AlrightEros.currentUser.isSignedIn()) {
        // callback = callback || this._go.bind(this, "");
        // callback();
        Backbone.history.navigate("", {trigger: true})
        return false;
      }

      return true;
    },

    _requireHasProfile: function(callback){
      if (AlrightEros.currentUser.escape("has_profile") === "false") {
        callback = callback || this._go.bind(this, "/profiles/new");
        callback();
        return false;
      }

      return true;
    },

    _goHome: function(){
      Backbone.history.navigate("", { trigger: true });
    },

    _go: function(route){
      Backbone.history.navigate(route, { trigger: true });
    },

    _swapContentBodyView: function (newView) {
      AlrightEros._contentBodyView && AlrightEros._contentBodyView.remove();
			if (newView){
	      AlrightEros._contentBodyView = newView;
	      this.$bodyEl.html(newView.render().$el);
			}
    },

    _swapContentHeaderView: function (newView) {
      AlrightEros._contentHeaderView && AlrightEros._contentHeaderView.remove();
			if (newView){
	      AlrightEros._contentHeaderView = newView;
	      this.$headerEl.html(newView.render().$el);
			}
    }

  })
})();
