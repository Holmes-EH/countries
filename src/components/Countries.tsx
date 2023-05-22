import { useQuery } from '@apollo/client'
import { gql } from '../gql'
import { Grid, Container, Loading, Card, Text } from '@nextui-org/react'
import { Link, useParams } from 'react-router-dom'
import Header from './Header'

const Countries = () => {
	const { code } = useParams() as { code: string }

	const GET_CONTINENT = gql(`
		query GetContinent($code:ID!) {
      continent(code:$code) {
        code,
        name,
        countries{
          name,
          code,
          emoji
        }
      }
    }
	`)
	const { loading, error, data } = useQuery(GET_CONTINENT, {
		variables: { code },
	})
	if (loading)
		return (
			<main>
				<h1>Country</h1>

				<Container fluid>
					<Grid.Container gap={2} justify='center'>
						<Loading />
					</Grid.Container>
				</Container>
			</main>
		)
	if (error) return <p>Error : {error.message}</p>
	if (!data) return <p>Error : Something went wrong</p>
	return (
		<main>
			<Header destination='/' />
			<Text h1 css={{ textAlign: 'center' }}>
				{data.continent?.name}
			</Text>
			<Container fluid>
				<Grid.Container gap={2} justify='center'>
					{data.continent?.countries.map((country, index) => (
						<Grid xs={4} key={`country-${index}`}>
							<CountryItem country={country} />
						</Grid>
					))}
				</Grid.Container>
			</Container>
		</main>
	)
}

const CountryItem = ({
	country,
}: {
	country: {
		__typename?: 'Country' | undefined
		name: string
		code: string
		emoji: string
	}
}) => {
	return (
		<Card isPressable isHoverable css={{ $$cardColor: '$colors$primary' }}>
			<Link to={`/country/${country.code}`}>
				<Card.Body css={{ margin: 0, padding: 0 }}>
					<Text size='$7xl' css={{ textAlign: 'center' }}>
						{country.emoji}
					</Text>
				</Card.Body>
				<Card.Footer justify='center' css={{ padding: 0 }}>
					<Text h3 css={{ textAlign: 'center', width: '100%' }}>
						{country.name}
					</Text>
				</Card.Footer>
			</Link>
		</Card>
	)
}

export default Countries
