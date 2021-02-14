import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './Components/TodoList';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
  } from "react-router-dom";

import NavMenu from './Components/NavMenu';
import SingleTask from './pages/SingleTask';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';


function App() {
  	return (
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
				<Route exact path="/not-found">
					<NotFound />
				</Route>
				<Redirect to="/not-found" />
			</Switch>
		</Router>
  	);
}

export default App;
