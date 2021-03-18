import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHelloQuery } from './generated/graphql';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<div>
				<header>
					<div>
						<Link to="/Home">Home</Link>
					</div>
					<div>
						<Link to="/Register">Register</Link>
					</div>
					<div>
						<Link to="/Login">Login</Link>
					</div>
				</header>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/Register" component={Register} />
					<Route exact path="/Login" component={Login} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};
export default Routes;
