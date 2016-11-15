import utils from './utils';

export class TodoModel {
	constructor(key) {
		this.key       = key;
		this.todos     = utils.store(key);
		this.onChanges = [];
	}

	subscribe(onChange) {
		this.onChanges.push(onChange);
	}

	inform() {
		utils.store(this.key, this.todos);
		this.onChanges.forEach(cb => cb());
	}

	addTodo(title) {
		this.todos = this.todos.concat({
			id:        utils.uuid(),
			title:     title,
			completed: false
		});

		this.inform();
	}

	toggleAll(checked) {
		this.todos = this.todos.map(todo =>
			utils.extend({}, todo, { completed: checked })
		);

		this.inform();
	}

	toggle(todoToToggle) {
		this.todos = this.todos.map(todo =>
			todo === todoToToggle ? utils.extend({}, todo, { completed: !todo.completed }) : todo
		);

		this.inform();
	}

	destroy(todo) {
		this.todos = this.todos.filter(candidate => candidate !== todo);

		this.inform();
	}

	save(todoToSave, text) {
		this.todos = this.todos.map(todo =>
			todo === todoToSave	? utils.extend({}, todo, { title: text }) : todo
		);

		this.inform();
	}

	clearCompleted() {
		this.todos = this.todos.filter(todo => !todo.completed);

		this.inform();
	}
}

export default TodoModel;
