console.log('hey');

const AppModel = Backbone.Model.extend({
    defaults: {
        title: 'ToDo App'
    }
});

const AppView = Backbone.View.extend({

    events: {
        'click #app__title' : 'showInputChangeTitleWithBtn',
        'click #change-title__btn--cancel' : 'hideInputChangeTitleWithBtn',
        'click #change-title__btn--submit' : 'changeTitle'
    },

    template:  _.template(
        `<div class="title__block">
            <h1 id="app__title" class="app__title"><%= title %></h1>
            <div class="change-title__block">
                <input type="text" name="mainTitle" id="change-title__input" class="change-title__input" placeholder="<%= title %>">
                <button id="change-title__btn--submit" class="change-title__btn change-title__btn--submit" type="submit">Change Name</button>
                <button id="change-title__btn--cancel" class="change-title__btn change-title__btn--cancel" type="submit">X</button>
            </div>
        </div>`),

    initialize: function () {
        this.listenTo(this.model, "change", this.render);

        this.render();
    },
     
    render: function(){
        this.$el.html(this.template({title: this.model.attributes.title}));
        $('#app').append(this.el);
        return this;
    },

    showInputChangeTitleWithBtn: function(){
        if($(".change-title__block").is(":hidden")){
            $(".change-title__block").slideToggle(300);
        }
    },

    hideInputChangeTitleWithBtn: function(){
        if($(".change-title__block").is(":visible")){
            $(".change-title__block").slideToggle(300);
        }
    },

    changeTitle: function() {
        let inputVal = $("#change-title__input").val();

        if(!!inputVal) {
            this.hideInputChangeTitleWithBtn();
            setTimeout(() => { 
                this.$el.html(this.template({title: inputVal})); 
            }, 300);
        }
    }
});

let appModel = new AppModel();

let appView = new AppView({model: appModel});