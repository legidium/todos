import React from 'react';

import { filter, keys } from './constants';
import { Router }       from './utils/director';

import TodoItem   from './TodoItem';
import TodoFooter from './TodoFooter';
import TodoModel  from './TodoModel';

class TodoApp extends React.Component {
  constructor(props) {
		super(props);

    this.state = {
      newTodo:    '',
      editing:    null,
      nowShowing: filter.ALL_TODOS
    };
  }

	componentDidMount() {
		const router = Router({
		 '/':          this.setState.bind(this, { nowShowing: filter.ALL_TODOS }),
		 '/active':    this.setState.bind(this, { nowShowing: filter.ACTIVE_TODOS }),
		 '/completed': this.setState.bind(this, { nowShowing: filter.COMPLETED_TODOS })
		 });
		 router.init('/');
	}

	render() {
		const { todos } = this.props.model;
		const activeTodoCount = todos.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0);
		const completedCount  = todos.length - activeTodoCount;

		const header = this.renderHeader();
		const main   = this.renderMain({ todos, activeTodoCount });
		const footer = this.renderFooter({ activeTodoCount, completedCount});

		return (
			<div className="todoapp">
				<div>
					{header}
					{main}
					{footer}
				</div>
			</div>
		);
	}

	renderHeader() {
		return (
			<header className="header">

				<h1>todos</h1>

				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus={true}
					value={this.state.newTodo}
					onKeyDown={this.handleNewTodoKeyDown.bind(this)}
					onChange={this.handleChange.bind(this)}
				/>

			</header>
		)
	}

	renderMain({ todos, activeTodoCount }) {
		if (todos.length) {
			const shownTodos = todos.filter(todo => {

				switch (this.state.nowShowing) {
					case filter.ACTIVE_TODOS:
						return !todo.completed;
					case filter.COMPLETED_TODOS:
						return todo.completed;
					default:
						return true;
				}
			});

			return (
				<section className="main">

					<input
						className="toggle-all"
						type="checkbox"
						checked={activeTodoCount === 0}
						onChange={this.toggleAll.bind(this)}
					/>

					<ul className="todo-list">
						{shownTodos.map(todo =>
							<TodoItem
								key={todo.id}
								todo={todo}
								editing={this.state.editing === todo.id}
								onToggle={this.toggle.bind(this, todo)}
								onDestroy={this.destroy.bind(this, todo)}
								onEdit={this.edit.bind(this, todo)}
								onSave={this.save.bind(this, todo)}
								onCancel={this.cancel.bind(this)}
							/>
						)}
					</ul>

				</section>
			);
		}
	}

	renderFooter({ activeTodoCount, completedCount }) {
		if (activeTodoCount || completedCount) {
			return (
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted.bind(this)}
				/>
			);
		}
	}

	handleChange(event) {
		this.setState({ newTodo: event.target.value });
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== keys.ENTER_KEY) return;

		event.preventDefault();

		const value = this.state.newTodo.trim();

		if (value) {
			this.props.model.addTodo(value);
			this.setState({ newTodo: '' });
		}
	}

	toggleAll(event) {
		this.props.model.toggleAll(event.target.checked);
	}

	toggle(todo) {
		this.props.model.toggle(todo);
	}

	destroy(todo) {
		this.props.model.destroy(todo);
	}

	edit(todo) {
		this.setState({ editing: todo.id });
	}

	save(todo, text) {
		this.props.model.save(todo, text);
		this.setState({ editing: null });
	}

	cancel() {
		this.setState({ editing: null });
	}

	clearCompleted() {
		this.props.model.clearCompleted();
	}
}

TodoApp.propTypes = {
	model: React.PropTypes.instanceOf(TodoModel).isRequired
};

export default TodoApp;
