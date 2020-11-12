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
                    <h1 id="app__title" class="app__title" name="title"></h1>
                    <div class="change-title__block">
                        <input type="text" name="title" id="change-title__input" class="change-title__input" placeholder="enter title">
                        <div class="change__btns">
                            <button id="change-title__btn--submit" class="change-title__btn change-title__btn--submit" type="submit">Change Name</button>
                            <button id="change-title__btn--cancel" class="change-title__btn change-title__btn--cancel" type="submit">X</button>
                        </div>
                    </div>
                </div>
                <div id="todos-container"></div>
                
                <button id="todo__add-btn" class="todo__add-btn" type="submit">Add Todo</button>
                <div id="todo-list__block"><ul class="todo__list"></ul></div>
            </div>`).bind(this);
    }

    initialize() {
        this.model = new App({
            todos: new TodoListsCollection([])
        });
        this._modelBinder = new Backbone.ModelBinder();
        const viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(function(model) {
            return new TodoListView( { model } );
        });
        this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
        this.render();
    }
        
    render(){
        this.$el.html(this.template());
        this._modelBinder.bind(this.model, this.el);
        this._collectionBinder.bind(this.model.get('todos'), this.$('#todos-container'));
        $('#app').append(this.el);
        return this;
    }

    addNewTodo() {
        this.model.get('todos').add(new TodoList());
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
        }
    }

}