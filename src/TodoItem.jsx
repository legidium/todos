import React      from 'react';
import ReactDOM   from 'react-dom';
import classNames from 'classnames';

import { keys } from './constants';

export class TodoItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editText: this.props.todo.title
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.todo !== this.props.todo ||
			nextProps.editing !== this.props.editing ||
			nextState.editText !== this.state.editText
		);
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.editing && this.props.editing) {
			const node = ReactDOM.findDOMNode(this.editField);
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	}

	render() {
		const { todo, editing } = this.props;

		return (
			<li className={classNames({
				editing:   editing,
				completed: todo.completed
			})}>

				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.props.onToggle}
					/>

					<label onDoubleClick={this.handleEdit.bind(this)}>
						{todo.title}
					</label>

					<button	className="destroy"	onClick={this.props.onDestroy} />

				</div>

				<input
					ref={input => this.editField = input}
					className="edit"
					value={this.state.editText}
					onBlur={this.handleSubmit.bind(this)}
					onChange={this.handleChange.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
				/>

			</li>
		);
	}

	handleSubmit(event) {
		const value = this.state.editText.trim();

		if (value) {
			this.props.onSave(value);
			this.setState({ editText: value });
		} else {
			this.props.onDestroy();
		}
	}

	handleEdit() {
		this.props.onEdit();
		this.setState({ editText: this.props.todo.title });
	}

	handleKeyDown(event) {
		switch (event.which) {
			case keys.ESCAPE_KEY:
				this.setState({ editText: this.props.todo.title });
				this.props.onCancel(event);
				break;
			case keys.ENTER_KEY:
				this.handleSubmit(event);
				break;
			default: // no action
		}
	}

	handleChange(event) {
		if (this.props.editing) {
			this.setState({ editText: event.target.value });
		}
	}
}

TodoItem.propTypes = {
	todo:      React.PropTypes.object.isRequired,
	editing:   React.PropTypes.bool.isRequired,
	onToggle:  React.PropTypes.func.isRequired,
	onDestroy: React.PropTypes.func.isRequired,
	onEdit:    React.PropTypes.func.isRequired,
	onSave:    React.PropTypes.func.isRequired,
	onCancel:  React.PropTypes.func.isRequired
};

export default TodoItem;
