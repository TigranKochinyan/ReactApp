import React from 'react';
import './taskSort.scss';
import { connect } from 'react-redux';

import { sortTasks } from './../../../store/actions';

const TaskSort = (props) => {

    const sortTasks = ( type = 'up', sortBy ) => {
        if (!sortBy) {
            return;
        }
        const taskList = [...props.taskList];
        taskList.sort((a, b) => {
            if(a[sortBy] > b[sortBy]){
                return type === 'up' ?  1 : -1;
            }
            if(a[sortBy] < b[sortBy]){
                return type === 'up' ?  -1 : 1;
            }
            return 0;
        });
        props.sortTasks(taskList);//sending sorted list to redux store
    }
    return (
        <div className="taskSort">
            <div className="taskSort-buttons">
                <p> Title 
                    <span className="taskSort-buttons-button" onClick={() => sortTasks('dawn', 'title')}>&#x2191;</span>
                    <span className="taskSort-buttons-button" onClick={() => sortTasks('up', 'title')}>&#x2193;</span>
                </p>
            </div>
            <div className="taskSort-buttons">
                <p> Date 
                    <span className="taskSort-buttons-button" onClick={() => sortTasks('dawn', 'date')}>&#x2191;</span>
                    <span className="taskSort-buttons-button" onClick={() => sortTasks('up', 'date')}>&#x2193;</span>
                </p>
            </div>
            <div className="taskSort-buttons">
                <p> Status 
                    <span className="taskSort-buttons-button" onClick={() => sortTasks('dawn')}>&#x2191;</span>
                    <span className="taskSort-buttons-button" onClick={() => sortTasks('up')}>&#x2193;</span>
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = (store) =>{
    return {
        taskList: store.taskList
    }
};

const mapDispatchToProps = {
    sortTasks
};




export default connect(mapStateToProps, mapDispatchToProps)(TaskSort);
