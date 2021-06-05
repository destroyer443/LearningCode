import './App.css';
import React from 'react';

function ToDoTable(props) {
  return (
    <tr>
      <td>
        <label>{props.id}</label>
      </td>
      <td>
        <label>{props.toDo}</label>
      </td>
      <td>
        <label>
          <input type="checkbox" />
        </label>
      </td>
    </tr>
  );
}

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Type what you need to do..."
        value={this.props.toDo}
        onChange={this.handleChange}
      />
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    const toDoCounter = 0;
    this.state = {
      list: [
        {
          id: '',
          toDo: '',
        },
      ],
      toDoCounter: toDoCounter,
    };

    this.add = this.add.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(toDo) {
    this.setState({
      toDo: toDo,
    });
  }

  add() {
    this.setState({
      list: [
        ...this.state.list,
        {
          id: this.state.toDoCounter + 1,
          toDo: this.state.toDo,
        },
      ],
      toDoCounter: this.state.toDoCounter + 1,
    });
  }

  render() {
    return (
      <div>
        <h1>A Simple To-do List</h1>
        <div>
          <InputBar toDo={this.state.toDo} onChange={this.handleChange} />
          <button onClick={this.add}>Add</button>
        </div>
        <div>
          <table>
            {this.state.list.map(todos => (
              <ToDoTable key={todos.id} {...todos} />
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default ToDoList;
