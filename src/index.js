import React    from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import TodoApp   from './TodoApp';
import TodoModel from './TodoModel';

const model = new TodoModel('todos');
const root  = document.getElementById('root');

function render() {
	ReactDOM.render(<TodoApp model={model} />, root);
}

model.subscribe(render);
render();