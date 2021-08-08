import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AddData from "./components/AddData";
import ViewData from "./components/ViewData";
import EditData from "./components/EditData";
import Home from "./components/Home";

function App() {
	return (
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/add" component={AddData} exact />
			<Route path="/edit" component={EditData} exact />
			<Route path="/view" component={ViewData} exact />
		</Switch>
	);
}

export default App;
