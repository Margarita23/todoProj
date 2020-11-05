class App extends Backbone.Model {
    initialize() {
        this.title = 'ToDo App';
    }
}

class TodoList extends Backbone.Model {
    initialize() {
        this.title = 'ToDo List Name';
    }
}

class TodoListsCollection extends Backbone.Collection {
    initialize() {
        this.model = TodoList;
    }
}

class TodoListView extends Backbone.View {

    events() {
        return {
                "click #todo__remove-btn" : "removeTodo"
        };
    }

    template() {
        return _.template(
            `<div class="todo-list__block">
                <ul class="todo__list">
                <% this.collection.each((model, index) => { %>
                    <li class="todo-item">
                        <h2><%= model.title %></h2>
                        <button data-id="<%= index %>" id="todo__remove-btn" class="todo__remove-btn" type="submit">X</button>
                    </li>
                <% }); %>
                </ul>
            </div>`
        ).bind(this);
    }

    initialize() {
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.collection, "remove", this.render);
        this.render();
    }
     
    render() {
        this.$el.html(this.template(this.collection.models));
        $('#app').append(this.el);
        return this;
    }
    
    removeTodo(btn) {
        let idTodo = $(btn.target).attr('data-id');  
        this.collection.remove(this.collection.models[idTodo]);
    }
}


class AppView extends Backbone.View {

    events() {
        return {
            'click #app__title' : 'showInputChangeTitleWithBtn',
            'click #change-title__btn--cancel' : 'hideInputChangeTitleWithBtn',
            'click #change-title__btn--submit' : 'changeTitle',
            "click #todo__add-btn" : "addNewTodo",
        };
    }

    template(){
        return _.template(
        `<div class="app__template">
            <div class="title__block">
                <h1 id="app__title" class="app__title"><%= this.model.title %></h1>
                <div class="change-title__block">
                    <input type="text" name="mainTitle" id="change-title__input" class="change-title__input" placeholder="<%= this.model.title %>">
                    <div class="change__btns">
                        <button id="change-title__btn--submit" class="change-title__btn change-title__btn--submit" type="submit">Change Name</button>
                        <button id="change-title__btn--cancel" class="change-title__btn change-title__btn--cancel" type="submit">X</button>
                    </div>
                </div>
            </div>
            <button id="todo__add-btn" class="todo__add-btn" type="submit">Add Todo</button>
            <div id="todo-list__block"></div>
        </div>`).bind(this);
    }

    initialize() {
        this._todoList = new TodoListsCollection();
        this.listenTo(this.model, "change", this.render);
        this.render();
        this.renderTodoList();
    }
     
    render(){
        this.$el.html(this.template());
        $('#app').append(this.el);
        return this;
    }

    showInputChangeTitleWithBtn(){
        if($('.change-title__block').is(':hidden')){
            $('#app__title').slideUp(300);
            $('.change-title__block').slideDown(1000);
        }
    }

    hideInputChangeTitleWithBtn(){
        if($(".change-title__block").is(":visible")){
            $(".change-title__block").slideToggle(300);
            $('#app__title').slideDown(1000);
        }
    }

    changeTitle() {
        let inputVal = $("#change-title__input").val();

        if(!!inputVal) {
            this.hideInputChangeTitleWithBtn();
            setTimeout(() => { 
                this.model.title = inputVal; 
                this.$el.html(this.template()); 
            }, 300);
        }
    }

    renderTodoList() {
        new TodoListView({collection: this._todoList});
    }

    addNewTodo() {
        this._todoList.add(new TodoList());
    }
}

const app = new App();
const appView = new AppView({model: app});