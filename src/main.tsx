import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Continents from './components/Continents'
import Countries from './components/Countries'
import Country from './components/Country'

const client = new ApolloClient({
	uri: 'https://countries.nausicaa.wilders.dev/',
	cache: new InMemoryCache(),
})

const router = createBrowserRouter([
	{
		path: '/',
		element: <Continents />,
	},
	{
		path: '/:code',
		element: <Countries />,
	},
	{
		path: '/country/:code',
		element: <Country />,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<NextUIProvider>
				<RouterProvider router={router} />
			</NextUIProvider>
		</ApolloProvider>
	</React.StrictMode>
)
