import request from '../helpers/request';
import * as actionTypes from './actionTypes';
import {history} from './../helpers/history';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params={}) {

    const query = Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&');
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });

        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
};

export const getTask = (id) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request(`${apiHost}/task/${id}`)
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

        request(`${apiHost}/task`, 'POST', task)
        .then((task)=>{
            dispatch({type: actionTypes.ADD_TASK, task: task});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message});
        });
    }
};
export const updateTask = (updatedTask) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request(`${apiHost}/task/${updatedTask._id}`, 'PUT', updatedTask)
        .then((task)=>{
            dispatch({type: actionTypes.UPDATE_TASK, updatedTask});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message});
        });
    }
};
export const deleteTask = (id, from) => {
    return (dispatch) => {
        request(`${apiHost}/task/${id}`, 'DELETE')
        .then((res)=>{
            dispatch({type: actionTypes.DELETE_TASK, id});
            if(from === 'single') {
                history.push('/');
                window.location = '/';//because history push is not working corect, but page is reloading
            }
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message})
        });
    }
};
export const deleteSelected = (requestBody, checkedTasks) => {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});

        request(`${apiHost}/task`, 'PATCH', requestBody)
        .then((res)=>{
            dispatch({type: actionTypes.DELETE_SELECTED, checkedTasks});
        })
        .catch(err => {
            dispatch({type: actionTypes.ERROR, message: err.message})
        });
    }
};