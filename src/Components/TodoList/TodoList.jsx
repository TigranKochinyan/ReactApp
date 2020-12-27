import React, { Component } from 'react';
import './todoList.css';

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
        const { taskList, inputValue } = this.state;
        if(inputValue) {
            taskList.push(inputValue)
            this.setState({
                taskList,
                inputValue: ''
            })
        }
    };
    render() {
        const { taskList } = this.state;
        const todoTasksElements = taskList.map((elem, index) => {
            return <li key={index}>
                { elem }
            </li>
        });
        return(
            <div>
                <h4>Todo List</h4>
                <p>input task :</p>
                <input 
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleClick}>save</button>
                <ul>
                    { todoTasksElements }
                </ul>
            </div>
        );
    };
};

export default TodoList;