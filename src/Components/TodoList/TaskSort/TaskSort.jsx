import React, { memo } from 'react';
import './taskSort.scss';
import PropTypes from 'prop-types'

const TaskSort = (props) => {
    return (
        <div className="taskSort">
            <div className="taskSort-buttons">
                <p> Title 
                    <span className="taskSort-buttons-button" onClick={() => props.sortTasks('dawn', 'title')}>&#x2191;</span>
                    <span className="taskSort-buttons-button" onClick={() => props.sortTasks('up', 'title')}>&#x2193;</span>
                </p>
            </div>
            <div className="taskSort-buttons">
                <p> Date 
                    <span className="taskSort-buttons-button" onClick={() => props.sortTasks('dawn', 'date')}>&#x2191;</span>
                    <span className="taskSort-buttons-button" onClick={() => props.sortTasks('up', 'date')}>&#x2193;</span>
                </p>
            </div>
            <div className="taskSort-buttons">
                <p> Status 
                    <span className="taskSort-buttons-button" onClick={() => props.sortTasks('dawn')}>&#x2191;</span>
                    <span className="taskSort-buttons-button" onClick={() => props.sortTasks('up')}>&#x2193;</span>
                </p>
            </div>
        </div>
    )
}

TaskSort.propTypes = {
    sortTasks: PropTypes.func.isRequired
}

export default memo(TaskSort);
