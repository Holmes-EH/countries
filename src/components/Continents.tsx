import { useQuery } from '@apollo/client'
import { gql } from '../gql'
import { Grid, Card, Text, Container, Loading } from '@nextui-org/react'
import { Link } from 'react-router-dom'

const Continents = () => {
	const GET_CONTINENTS = gql(`
		query GetContinents {
			continents {
				code
				name
			}
		}
	`)
	const { loading, error, data } = useQuery(GET_CONTINENTS)
	if (loading)
		return (
			<main>
				<Text h1 css={{ textAlign: 'center' }}>
					Continents
				</Text>

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
			<Text h1 css={{ textAlign: 'center' }}>
				Continents
			</Text>
			<Container fluid>
				<Grid.Container gap={2} justify='center'>
					{data.continents.map((continent, index) => (
						<Grid xs={4} key={`continent-${index}`}>
							<ContinentItem continent={continent} />
						</Grid>
					))}
				</Grid.Container>
			</Container>
		</main>
	)
}
const ContinentItem = ({
	continent,
}: {
	continent: {
		__typename?: 'Continent' | undefined
		code: string
		name: string
	}
}) => {
	return (
		<Card
			isPressable
			isHoverable
			css={{ h: '$24', $$cardColor: '$colors$primary' }}
		>
			<Link to={continent.code}>
				<Card.Body alignItems='center'>
					<Text h6 size={15} color='white' css={{ mt: 0 }}>
						{continent.name}
					</Text>
				</Card.Body>
			</Link>
		</Card>
	)
}

export default Continents
