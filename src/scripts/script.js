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
            'click #todo__remove-btn' : 'removeTodo',
            'click .todo__title' : 'showInputChangeTitleWithBtn',
            'click #text__change-btn--cancel' : 'hideInputChangeTitleWithBtn',
            'click #text__change-btn--submit' : 'changeTitle',
        };
    }

    template() {
        return _.template(
            `<div class="todo-list__block">
                <ul class="todo__list">
                <% this.collection.each((model, index) => { %>
                    <li class="todo__item">
                        <button data-id="<%= index %>" id="todo__remove-btn" class="todo__remove-btn" type="submit">X</button>
                        <h2 data-id="<%= index %>" class="todo__title"><%= model.title %></h2>
                        <div class="todo__change-block">
                            <input type="text" name="todoItemTitle" class="todo-title__input" placeholder="<%= model.title %>">
                            <div class="change__btns change__btns--todo">
                                <button data-id="<%= index %>" data-cid="<%= model.cid %>" id="text__change-btn--submit" class="text__change-btn text__change-btn--submit" type="submit">Change Text</button>
                                <button data-id="<%= index %>" id="text__change-btn--cancel" class="text__change-btn text__change-btn--cancel" type="submit">X</button>
                            </div>
                        </div>
                    </li>
                <% }); %>
                </ul>
            </div>`
        ).bind(this);
    }

    initialize() {
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'update', this.render);
        this.render();
    }
     
    render() {
        this.$el.html(this.template(this.collection.models));
        $('#app').append(this.el);
        return this;
    }
    
    removeTodo(btn) {
        const idTodo = $(btn.target).attr('data-id');  
        this.collection.remove(this.collection.models[idTodo]);
    }

    changeTitle(btn) {
        const idTodoItem = $(btn.target).attr('data-id'); 
        const cidTodoItem = $(btn.target).attr('data-cid'); 
        const inputVal = this.$('.todo-title__input').eq(idTodoItem).val();

        if(!!inputVal) {
            this.hideInputChangeTitleWithBtn(btn);
            setTimeout(() => {
                this.collection.get({cid: cidTodoItem}).title = inputVal;
                this.$el.html(this.template(this.collection.models));                
            }, 300);
        }
    }

    showInputChangeTitleWithBtn(title){
        const idTodoItem = $(title.target).attr('data-id');
        if($('.todo__change-block').eq(idTodoItem).is(':hidden')){
            this.$('.todo__title').eq(idTodoItem).slideUp(300);
            this.$('.todo__change-block').eq(idTodoItem).slideDown(1000);
        }
    }
    
    hideInputChangeTitleWithBtn(btn) {
        let idTodoItem = $(btn.target).attr('data-id');
        if($('.todo__change-block').eq(idTodoItem).is(':visible')){
            this.$('.todo__change-block').eq(idTodoItem).slideToggle(300);
            this.$('.todo__title').eq(idTodoItem).slideDown(1000);
        }
    }
}

class AppView extends Backbone.View {

    events() {
        return {
            'click #app__title' : 'showInputChangeTitleWithBtn',
            'click #change-title__btn--cancel' : 'hideInputChangeTitleWithBtn',
            'click #change-title__btn--submit' : 'changeTitle',
            'click #todo__add-btn' : 'addNewTodo',
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
        this.listenTo(this.model, 'change', this.render);
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
            this.$('#app__title').slideUp(300);
            this.$('.change-title__block').slideDown(1000);
        }
    }

    hideInputChangeTitleWithBtn(){
        if($('.change-title__block').is(':visible')){
            this.$('.change-title__block').slideToggle(300);
            this.$('#app__title').slideDown(1000);
        }
    }

    changeTitle() {
        const inputVal = this.$('#change-title__input').val();

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