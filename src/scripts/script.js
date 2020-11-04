console.log('hey');

const App = Backbone.Model.extend({
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

const app = new App();
const appView = new AppView({model: app});

// --------------------------------------
// TODO ITEM
// --------------------------------------

const TodoItem = Backbone.Model.extend({
    defaults: {
        text: 'What I need to do'
    }
});

const TodoItemSet = Backbone.Collection.extend({
    model: TodoItem
}, []);


const TodoItemView = Backbone.View.extend({
    template: _.template(
        `<div class="todo-items__block">
            <p>TEXT</p>
        </div>`
    ),

    // <% for (let i = 0; i < todos.length; i++) { %>
    //     <ul>
    //         <li class="todo-list">
    //             <h2><%= todos[i].attributes.title %></h2>
    //         </li>
    //     </ul>
    //     <% } %>

    initialize: function () {
        this.listenTo(this.collection, "change", this.render);
        this.render();
    },
     
    render: function(){
        // this.$el.html(this.template({todos: this.collection.models}));
        console.log("this ITEMS");
        // console.log(this.collection.models);
        $('#app').append(this.el);
        return this;
    },


});


// --------------------------------------
// TODO LIST SET
// --------------------------------------

const TodoList = Backbone.Model.extend({
    defaults: {
        title: 'ToDo List Name'
    }
});

const TodoListSet = Backbone.Collection.extend({
    model: TodoList
}, []);

const TodoListView = Backbone.View.extend({
    events: {
        "click #todo__add-btn" : "addNewTodo",
        "click #todo__remove-btn" : "removeTodo"
    },

    template: _.template(
        `<div class="todo-list__block">

            <button id="todo__add-btn" class="todo__add-btn" type="submit">Add Todo</button>
            
            <ul>
            <% for (let i = 0; i < todos.length; i++) { %>
                <li class="todo-list">
                    
                    <h2><%= todos[i].attributes.title %></h2>
                    <button data-id="<%= i %>" id="todo__remove-btn" class="todo__remove-btn" type="submit">X</button>

                </li>
            <% } %>
            </ul>
        </div>`
    ),

    initialize: function () {
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);
        // this.listenTo(this.collection, "change", this.render);
        this.render();
    },
     
    render: function(){
        this.$el.html(this.template({todos: this.collection.models}));
        $('#app').append(this.el);
        return this;
    },

    addNewTodo: function() {
        this.collection.add(new TodoList());
    },
    
    removeTodo: function(btn) {
        let idTodo = $(btn.target).attr('data-id');  
        this.collection.remove(this.collection.models[idTodo]);

        // this.collection.models.splice(idTodo, 1);
        console.log(this.collection.models);
    }

});

const todoListSet = new TodoListSet([new TodoList({title: "He"}), new TodoList({title: "She"}),new TodoList({title: "It "})]);
const todoListView = new TodoListView({collection:  todoListSet});
