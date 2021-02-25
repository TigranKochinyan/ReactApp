import request from '../helpers/request';
import * as actionTypes from './actionTypes';

export const getTasks = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request('http://localhost:3001/task')
        .then((tasks)=>{
            dispatch({type: actionTypes.GET_TASKS, tasks: tasks});
        });
    }
};

export const getTask = (id) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task/${id}`)
        .then((task)=>{
            dispatch({type: 'GET_TASK', task: task});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message});
        });
    }
};

export const saveTask = (task) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request('http://localhost:3001/task', 'POST', task)
        .then((task)=>{
            dispatch({type: actionTypes.ADD_TASK, task: task});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message});
        });
    }
};
export const updateTask = (updatedTask, index) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task/${updatedTask._id}`, 'PUT', updatedTask)
        .then((task)=>{
            dispatch({type: actionTypes.UPDATE_TASK, updatedTask});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message})
        });
    }
};
export const deleteTask = (id) => {
    return (dispatch) => {
        request(`http://localhost:3001/task/${id}`, 'DELETE')
        .then((res)=>{
            dispatch({type: actionTypes.DELETE_TASK, id});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message})
        });
    }
};
export const deleteSelected = (requestBody, checkedTasks) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task`, 'PATCH', requestBody)
        .then((res)=>{
            dispatch({type: actionTypes.DELETE_SELECTED, checkedTasks});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message})
        });
    }
};
export const sortTasks = (taskList) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SORT_LIST, taskList});
    }
};