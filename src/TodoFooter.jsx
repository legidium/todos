import React      from 'react';
import classNames from 'classnames';

import utils      from './utils';
import { filter } from './constants';

export const TodoFooter = ({ count, completedCount, nowShowing, onClearCompleted }) => (
	<footer className="footer">

		<span className="todo-count">
			<strong>{count}</strong> {utils.pluralize(count, 'item')} left
		</span>

		<ul className="filters">
			{[
				{ link: '#/',          text: 'All',       active: nowShowing === filter.ALL_TODOS },
				{ link: '#/active',    text: 'Active',    active: nowShowing === filter.ACTIVE_TODOS },
				{ link: '#/completed', text: 'Completed', active: nowShowing === filter.COMPLETED_TODOS }
			].map(i => (
				<li>
					<a href={i.link} className={classNames({ selected: i.active })}>
						{i.text}
					</a>
				</li>
			))}
		</ul>

		{completedCount > 0 && (
			<button className="clear-completed"	onClick={onClearCompleted}>
				Clear completed
			</button>
		)}

	</footer>
);

TodoFooter.propTypes = {
	count:            React.PropTypes.number.isRequired,
	completedCount:   React.PropTypes.number.isRequired,
	nowShowing:       React.PropTypes.string.isRequired,
	onClearCompleted: React.PropTypes.func.isRequired
};

export default TodoFooter;