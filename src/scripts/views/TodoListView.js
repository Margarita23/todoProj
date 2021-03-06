class TodoListView extends Backbone.View {

    events() {
        return {
            'click .todos__title' : 'showInputChangeTitleWithBtn',
            'click .text__change-btn--cancel' : 'hideInputChangeTitleWithBtn',
            'click .text__change-btn--submit' : 'changeTitle',
            'click .todo__btn--remove' : 'removeTodoList',
            'click .todo__btn--add' : 'addTodoItem'
        };
    }

    template() {
        return _.template(
            `<div class="todos__item">
                <button class="todo__btn todo__btn--remove" type="submit">X</button>
                <h2 name="title" class="todos__title"></h2>
                <div class="todo__change-block">
                    <input type="text" class="todo-title__input">
                    <div class="change__btns change__btns--todo">
                        <button class="text__change-btn text__change-btn--submit" type="submit">Change Text</button>
                        <button class="text__change-btn text__change-btn--cancel" type="submit">X</button>
                    </div>
                </div>
                <button class="todo__btn todo__btn--add" type="submit">Add Task</button>
                <div id="todo__list"></div>
            </div>`
        );
    }

    initialize() {
        this.model.set('items', new TodoListsCollection([]));
        this._modelBinder = new Backbone.ModelBinder();
        const viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(function(model) {
            return new TodoItemView( { model } );
        });
        this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
    }

    render() {
        this.$el.html(this.template());
        this._modelBinder.bind(this.model, this.el);
        this._collectionBinder.bind(this.model.get('items'), this.$('#todo__list'));
        return this;
    }

    changeTitle() {
        const inputVal = this.$('.todo-title__input').val();
        if(!!inputVal) {
            this.hideInputChangeTitleWithBtn();
            this.model.set('title', inputVal); 
        }
    }

    removeTodoList() {
        this.remove();
    }

    showInputChangeTitleWithBtn(){
        const todoChangeBlock = this.$('.todo__change-block');
        if(todoChangeBlock.is(':hidden')){
            this.$('.todo__title').slideUp(300);
            todoChangeBlock.slideDown(1000);
        }
    }

    hideInputChangeTitleWithBtn() {
        const todoChangeBlock = this.$('.todo__change-block');
        if(todoChangeBlock.is(':visible')){
            todoChangeBlock.slideToggle(300);
            this.$('.todo__title').slideDown(1000);
        }
    }

    addTodoItem() {
        this.model.get('items').add(new TodoItem());
    }
}