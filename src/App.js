import React from 'react';
import './App.css';

function ToDoTable(props) {
  return (
    <tr>
      <td>
        <label>{props.number}</label>
      </td>
      <td>
        <label>{props.toDo}</label>
      </td>
      <td>
        <label><input type="checkbox" /></label>
      </td>
      <td>
        <label><button onClick = {props.remove}>Remove </button></label>
      </td>
    </tr>
  )
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
      <input type="text" placeholder="Type what you need to do..." 
      value={this.props.toDo} onChange={this.handleChange} />
    )
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    const toDoCounter = 0;
    this.state = {
      list: [],
      toDoCounter: toDoCounter,
    };
  
  this.add = this.add.bind(this);
  this.handleChange = this.handleChange.bind(this);
  }

  handleChange(toDo) {
    this.setState( {
          toDo: toDo,
        }
    )
    console.log(this.state.toDo);
  }

  add() {
    this.setState({
      list: [
        ...this.state.list,
        {
          id: this.state.toDoCounter +1,
          toDo: this.state.toDo,
        }
      ],
      toDoCounter: this.state.toDoCounter +1,
    })
    this.setState({
      toDo: '',
    })
    console.log(this.state.list);
  }

  remove(index) {
    this.state.list.splice(index,1);
    this.setState({
      list: this.state.list,
    })
    console.log(this.state.list);
  }

  render(){
    return (
      <div>
      <h1>A Simple To-do List</h1>
        <div>
          <InputBar toDo={this.state.toDo} onChange={this.handleChange} />
          <button onClick= {this.add}>Add</button>
        </div>
        <br />
        <div>
          <table>
          {this.state.list.map((todos,index) => (
          <ToDoTable key={todos.id} number={index+1} toDo={todos.toDo} 
          remove= {() => this.remove(index)} />
        ))}
          </table>
        </div>
      </div>
    );
  }
}

export default ToDoList;
