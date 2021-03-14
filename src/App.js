import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './Components/TodoList';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
  } from "react-router-dom";
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavMenu from './Components/NavMenu';
import SingleTask from './pages/SingleTask';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';


import Spinner from './Components/Spinner';


function App({ successMessage, errorMessage, loading }) {

	useEffect(() => {

		if(successMessage) {
			toast.success(successMessage, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		};
		if(errorMessage) {
			toast.error(errorMessage, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [successMessage, errorMessage]);
  	return (
		  <div className="app">
			<Router>
				<NavMenu />
				<Switch>
					<Route exact path="/">
						<TodoList />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
					<Route exact path="/contact">
						<Contact />
					</Route>
					<Route exact path="/task/:taskId" component={SingleTask} />
					<Route exact path="/signin">
						<Login />
					</Route>
					<Route exact path="/signup">
						<Register />
					</Route>
					<Route exact path="/not-found">
						<NotFound />
					</Route>
					<Redirect to="/not-found" />
				</Switch>
			</Router>
			{ 
				loading && <Spinner/>
			}
			<ToastContainer/>
		</div>
  	);
}


//connect1
const mapStateToProps = (store) => {
    return {
		loading: store.loading,
		errorMessage: store.errorMessage,
		successMessage: store.successMessage
    }
}


export default connect(mapStateToProps)(App);
