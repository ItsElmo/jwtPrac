import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { accessToken, getAccessToken } from './accessToken';

const link = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	headers: {
		authorization: `bearer ${accessToken}`,
	},
});
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
	cache: new InMemoryCache(),
	link,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>,
	document.getElementById('root')
);
