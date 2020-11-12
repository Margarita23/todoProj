class TodoItemView extends Backbone.View {

    events() {
        return {
            'click .task__title' : 'showInputChangeTitleWithBtn',
            'click .text__change-btn--submit' : 'changeTaskText',
            'click .text__change-btn--cancel' : 'hideInputChangeTitleWithBtn',
            'click .task__btn--remove' : 'removeTask'
        }
    }

    template() {
        return _.template(
            `<div>
                <div class="todo__item">
                    <button class="task__btn--remove" type="submit">X</button>
                    <h3 class="task__title" name="title"></h3>
                    <div class="task__change-block">
                        <input type="text" class="task-title__input">
                        <div class="change__btns change__btns--todo">
                            <button class="text__change-btn text__change-btn--submit" type="submit">Change Text</button>
                            <button class="text__change-btn text__change-btn--cancel" type="submit">X</button>
                        </div>
                    </div>
                </div>
            <div>`
        );
    }

    initialize() {
        this._modelBinder = new Backbone.ModelBinder();
    }
    
    render() {
        this.$el.html(this.template());
        this._modelBinder.bind(this.model, this.el);
        return this;
    }

    changeTaskText() {
        const inputVal = this.$('.task-title__input').val();
        if(!!inputVal) {
            this.hideInputChangeTitleWithBtn();
            this.model.set('title', inputVal); 
        }
    }
    
    removeTask() {
        this.remove();
    }

    showInputChangeTitleWithBtn(){
        const taskChangeBlock = this.$('.task__change-block');
        if(taskChangeBlock.is(':hidden')){
            this.$('.task__title').slideUp(300);
            taskChangeBlock.slideDown(1000);
        }
    }
    
    hideInputChangeTitleWithBtn() {
        const taskChangeBlock = this.$('.task__change-block');
        if(taskChangeBlock.is(':visible')){
            taskChangeBlock.slideToggle(300);
            this.$('.task__title').slideDown(1000);
        }
    }
}