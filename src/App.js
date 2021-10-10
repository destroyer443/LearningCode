import React from "react";
import "./App.css";

class ToDoTable extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <label>{this.props.number}</label>
        </td>
        <td>
          <label>{this.props.toDo}</label>
        </td>
        <td>
          <label>
            <input
              id={this.props.id}
              type="checkbox"
              defaultChecked={this.props.completed}
              onChange={() => this.props.handleChecked(this.props.id)}
            />
          </label>
        </td>
        <td>
          <label>
            <button onClick={this.props.remove}>Remove </button>
          </label>
        </td>
      </tr>
    );
  }
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
      list: [],
      toDoCounter: toDoCounter,
      toDo: "",
    };

    this.add = this.add.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChange(toDo) {
    this.setState(
      {
        toDo: toDo,
      },
      () => {
        console.log(this.state.toDo);
      }
    );
  }

  handleChecked(id) {
    this.state.list.map((todos) => {
      if (id === todos.id) {
        return { ...todos, completed: !todos.completed };
      }
      return todos;
    });
    this.setState(
      {
        list: this.state.list,
      },
      () => {
        console.log(this.state.list);
      }
    );
  }

  add() {
    this.setState(
      {
        list: [
          ...this.state.list,
          {
            id: this.state.toDoCounter + 1,
            toDo: this.state.toDo,
            completed: false,
          },
        ],
        toDoCounter: this.state.toDoCounter + 1,
      },
      () => {
        console.log(this.state.list);
      }
    );
    this.setState({
      toDo: "",
    });
  }

  remove(index) {
    this.state.list.splice(index, 1);
    this.setState(
      {
        list: this.state.list,
      },
      () => {
        console.log(this.state.list);
      }
    );
  }

  render() {
    return (
      <div>
        <h1>A Simple To-do List</h1>
        <div>
          <InputBar toDo={this.state.toDo} onChange={this.handleChange} />
          <button onClick={this.add}>Add</button>
        </div>
        <br />
        <br />
        <div>
          <table>
            <tbody>
              {this.state.list.map((todos, index) => (
                <ToDoTable
                  key={todos.id}
                  id={todos.id}
                  number={index + 1}
                  toDo={todos.toDo}
                  remove={() => this.remove(index)}
                  completed={todos.completed}
                  handleChecked={this.handleChecked}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ToDoList;
