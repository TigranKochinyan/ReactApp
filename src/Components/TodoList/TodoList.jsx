import React, { Component } from 'react';
import './todoList.scss';

class TodoList extends Component {
    state = {
        taskList: [],
        inputValue: '',
    };
    handleInputChange = (event) => {
        let { value } = event.target;
        this.setState({
            inputValue: value
        })
    };
    handleClick = () => {
        const { inputValue } = this.state;
        const taskList = [...this.state.taskList];
        if(inputValue) {
            taskList.push(inputValue)
            this.setState({
                taskList,
                inputValue: ''
            })
        }
    };
    removeTask= (event) => {
        console.log(event.target.attributes.name.name);
    }
    render() {
        const { taskList } = this.state;
        const todoTasksElements = taskList.map((elem, index) => {
            return <li key={index}>
                { elem }
                <button name={index} onClick={this.removeTask}>delete</button>
            </li>
        });
        
        return(
            <div className="TodoList">
                <h4>Todo List</h4>
                <p>input task :</p>
                <input 
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleClick}>save</button>
                <ul className="TodoList-list">
                    { todoTasksElements }
                </ul>
            </div>
        );
    };
};

export default TodoList;