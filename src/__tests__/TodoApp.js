import React    from 'react';
import ReactDOM from 'react-dom';

import TodoApp from '../TodoApp';
import TodoModel from '../TodoModel';

it('renders without crashing', () => {

  const model = new TodoModel('todos');
  const div = document.createElement('div');

  ReactDOM.render(<TodoApp model={model} />, div);
});
