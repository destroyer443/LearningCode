
function ToDoTable(props){
  return (
    <tr>
      <td>
      <label>{props.id}</label>
      </td>
      <td>{props.todo}
      </td>
    </tr>
  )
}
class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
  }

  add(e) {
    this.props.onAdd(e.target.value);
  }

  render() {
    return (
      <div>
      <input type="text" placeholder="Type what you need to do..." value={this.props.todo} />
      <button onclick={this.add}>Add</button>
      </div>
    )
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    const toDoCounter = 1;
    this.state = {
      list: [
        {
          id: toDoCounter,
          todo: '',
        },
      ],
      toDoCounter: toDoCounter,
    };
  
  this.add = this.add.bind(this);
  }

  add(todo) {
    this.setState({
      list: [
        ...this.state.list,
        {
          id: this.state.toDoCounter +1,
          todo: todo,
        }
      ],
      toDoCounter: this.state.toDoCounter +1,
    })
  }

  render(){
    return (
      <div>
        <InputBar todo={this.state.todo} onAdd={this.add} />
      <table>
      {this.state.list.map((todos,index) => (
        <ToDoTable key={todos.id} {...todos} />
      ))}
      </table>
      </div>
    );
  }
}

ReactDOM.render(
  <ToDoList />,
  document.getElementById('root')
);