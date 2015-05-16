AlrightEros.Views.SignUp = Backbone.View.extend({

  initialize: function (options) {
    console.log("I'm initializing");
    this.callback = options.callback;
  },

  events: {
    'submit form': 'submit'
  },

  template: JST['shared/sign_up'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;
    formData.success = function () {
      Backbone.history.navigate("", {trigger: true})
    };

    this.model.signUp(formData);
  },

  signInCallback: function (event) {
    if (this.callback) {
      this.callback();
    }
    else {
      Backbone.history.navigate("", {trigger: true})
    }
  }
});

// function () {      var base =        _.result(this, 'urlRoot') ||        _.result(this.collection, 'url') ||        urlError();      if (this.isNew()) return base;      return base.replace(/([^//])$/, '$1/') + encodeURIComponent(this.id);    }
//WTF???????
