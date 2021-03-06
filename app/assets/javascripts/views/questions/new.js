;(function(){
	"use strict";
  AlrightEros.Views.QuestionNew = Backbone.View.extend({
    initialize: function (options){
      // this.listenTo(this.model, 'sync', this.render)
    },

    tagName: "form",

    template: JST['questions/new'],

    events: {
      'click button': 'submit'
    },

    render: function () {
      var content = this.template();
      this.$el.html(content);

      return this;
    },

    submit: function (event) {
      event.preventDefault();

      var question = this.model;

      var questionData = this.$el.serializeJSON();
      var answers = questionData.question.answers;
      !answers[3].answer_text && delete answers[3];
      !answers[4].answer_text && delete answers[4];

      this.model.save(questionData, {
        success: function () {
          Backbone.history.navigate("#/questions/" + question.escape("id"))
        },
				error: function(response){
					alert(response)
				}.bind(this)
      })
    }
  });
})();
