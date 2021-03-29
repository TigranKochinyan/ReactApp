import React, { useEffect } from 'react';
import './App.scss';
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
import AuthRoute from './Components/AuthRoute';
import Footer from './Components/Footer';


function App({ successMessage, errorMessage, loading, isAuthentificate, theme }) {

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
		  <div className={`app app-${theme}`}>
			<Router>
				<NavMenu />
				<Switch>
					<AuthRoute 
						exact 
						path="/" 
						type='private' 
						isAuth={isAuthentificate} 
						component={TodoList} 
					/>
					<AuthRoute 
						exact 
						path="/task/:taskId" 
						type='private' 
						isAuth={isAuthentificate} 
						component={SingleTask} 
					/>
					<AuthRoute 
						exact 
						type='public'
						path="/signin"
						isAuth={isAuthentificate}
						component={Login}
					/>
					<AuthRoute
						exact
						type='public' 
						path="/signup"
						isAuth={isAuthentificate}
						component={Register}
					/>
					<Route exact path="/about" component={About} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/not-found" component={NotFound} />
					<Redirect to="/not-found" />
				</Switch>
				<Footer/>
			</Router>
			{ 
				loading && <Spinner/>
			}
			<ToastContainer/>
		</div>
  	);
}

const mapStateToProps = (store) => {
    return {
		loading: store.loading,
		errorMessage: store.errorMessage,
		successMessage: store.successMessage,
		isAuthentificate: store.isAuthentificate,
		theme: store.theme
    }
}

export default connect(mapStateToProps)(App);
