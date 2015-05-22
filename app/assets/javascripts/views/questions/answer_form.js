;(function(){
	"use strict";
  AlrightEros.Views.QuestionAnswerForm = Backbone.View.extend({
    template: JST['questions/answer_form'],

    tagName: 'form',

    initialize: function(options) {
      this.listenTo(this.model, "sync", this.render)
      AlrightEros.questions.fetch();
			this.modal = options.modal;
			this.parentView = options.parentView;
    },

    events: {
      "submit": "submit"
    },

    render: function() {
      var content = this.template({
        question: this.model
      });
      this.$el.html(content);

      return this;
    },

    submit: function(event){
      event.preventDefault();

      var formData = this.$el.serializeJSON();

      var userAnswer = new AlrightEros.Models.UserAnswer({
        question_id: this.model.id
      });
// TODO: refactor this monstrosity
      userAnswer.submitUserAnswer(formData, {
        success: function() {
          AlrightEros.currentUser.attributes.answered_questions.push(this.model.id);
					if (this.modal){
						$("#modal-view").addClass("hidden");
						this.parentView.collection.fetch({
							success: function(){
								this.parentView.render();
							}.bind(this)
						});
						return;
					}
          var next = AlrightEros.questions.nextNewQuestion(this.model.id);
          Backbone.history.navigate("#/questions/" + next, {trigger: true});
        }.bind(this)
      });

    }
  });
})();
