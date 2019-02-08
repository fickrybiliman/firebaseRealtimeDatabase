import React, { Component } from 'react';
import './App.css';
import firebase from './firebase/index';

class App extends Component {
  constructor() {
    super()
    this.state = {
      todo : '',
      todos : []
    }
  }

  componentDidMount() {
    firebase.database().ref('todos/').on('value', (snapshot) => {
      // console.log(snapshot.val())
      const todosFirebase = snapshot.val();
      const todos = Object.keys(todosFirebase).map(key => {
        return {
          key : key,
          todoText : todosFirebase[key].todoText
        }
      })
      this.setState({todos: todos})
    })
  }

  _handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }
  
  _handleSubmit =(e) => {
    const newTodoKey = firebase.database().ref('todos/').push().key;
    firebase.database().ref('todos/').update({
      [newTodoKey] : {
        todoText : this.state.todo
      }
    })
    e.preventDefault();
  }

  _handleEdit = (key) => {
    firebase.database().ref(`todos/${key}`).update({
      [key] : {
        this.setState({todos.todoText : this.state.todo})
      }
    })
  }

  _handleDelete = (key) => {
    firebase.database().ref(`todos/${key}`).remove()
  } 

  render() {
    return (
      <div className="App">
        <h1>Data RealTime Todo</h1>
        <form onSubmit = {this._handleSubmit}>
          <input 
            type="text"
            name="todo"
            onChange={this._handleChange}
            value={this.state.todo}
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {
            this.state.todos.map((data, index) => {
              return (
                <li 
                  key = {index}
                  >{data.todoText} 
                  <button
                    onClick = {() => {this._handleEdit(data.key)}}
                    >Edit
                  </button>
                  <button 
                    onClick = {() => {this._handleDelete(data.key)}}
                    >Hapus
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
