import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		
		<Routes />
	</ApolloProvider>,
	document.getElementById('root')
);
