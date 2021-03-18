import React from 'react';
import { Link } from 'react-router-dom';
import { useUsersQuery } from '../generated/graphql';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
	//! this returns a object thats why we have to include the {data,}
	const { data } = useUsersQuery({ fetchPolicy: 'network-only' });
	if (!data) {
		return <div>loading...</div>;
	}
	return (
		<div>
			<div>users:</div>
			<ul>
				{data.users.map((x) => {
					return (
						<li key={x.id}>
							{x.email}, {x.id}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
