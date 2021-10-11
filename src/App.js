import React from "react";
import "./App.css";

class ToDoTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleEdit(e) {
    this.props.handleEdit(e.target.value);
  }
  render() {
    const isEditing = this.props.isEditing;
    const viewTemplate = (
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
              checked={this.props.completed}
              onChange={() => this.props.handleChecked(this.props.id)}
            />
          </label>
        </td>
        <td>
          <button onClick={() => this.props.editMode(this.props.id)}>
            Edit{" "}
          </button>
        </td>
        <td>
          <button onClick={this.props.remove}>Remove </button>
        </td>
      </tr>
    );

    const editingTemplate = (
      <tr>
        <td>
          <label>{this.props.number}</label>
        </td>
        <td>
          <input
            type="text"
            placeholder="New name"
            onChange={this.handleEdit}
            value={this.props.newName}
            id={this.props.id}
          />
        </td>
        <td>
          <label>
            <input
              id={this.props.id}
              type="checkbox"
              checked={this.props.completed}
              onChange={() => this.props.handleChecked(this.props.id)}
            />
          </label>
        </td>
        <td>
          <button
            onClick={() =>
              this.props.save(
                this.props.id,
                this.props.newName,
                this.props.exitEditMode
              )
            }
          >
            Save
          </button>
        </td>
        <td>
          <button onClick={() => this.props.exitEditMode(this.props.id)}>
            Cancel
          </button>
        </td>
      </tr>
    );
    return isEditing ? editingTemplate : viewTemplate;
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
      newName: "",
    };

    this.add = this.add.bind(this);
    this.editMode = this.editMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
    const newList = this.state.list.map((todos) => {
      if (id === todos.id) {
        return { ...todos, completed: !todos.completed };
      }
      return todos;
    });
    this.setState({ list: newList }, () => {
      console.log(this.state.list);
    });
  }

  handleEdit(newName) {
    this.setState(
      {
        newName: newName,
      },
      () => {
        console.log(this.state.newName);
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
            isEditing: false,
          },
        ],
        toDoCounter: this.state.toDoCounter + 1,
        toDo: "",
      },
      () => {
        console.log(this.state.list);
      }
    );
  }

  editMode(id) {
    const editModeList = this.state.list.map((todos) => {
      if (id === todos.id) {
        return { ...todos, isEditing: true };
      }
      return { ...todos, isEditing: false };
    });
    this.setState({
      list: editModeList,
    });
  }

  exitEditMode(id) {
    const normalList = this.state.list.map((todos) => {
      if (id === todos.id) {
        return { ...todos, isEditing: false };
      }
      return todos;
    });
    this.setState({
      list: normalList,
    });
  }

  save(id, newName) {
    const editedList = this.state.list.map((todos) => {
      if (id === todos.id) {
        return { ...todos, toDo: newName, isEditing: false };
      }
      return todos;
    });
    this.setState(
      {
        list: editedList,
        newName: "",
      },
      () => console.log(this.state.list)
    );
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
                  handleEdit={this.handleEdit}
                  newName={this.state.newName}
                  isEditing={todos.isEditing}
                  editMode={this.editMode}
                  exitEditMode={this.exitEditMode}
                  save={this.save}
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
