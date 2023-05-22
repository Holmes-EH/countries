import { useParams } from 'react-router-dom'
import { gql } from '../gql'
import { useQuery } from '@apollo/client'
import { Container, Grid, Loading, Text } from '@nextui-org/react'
import Header from './Header'

const Country = () => {
	const { code } = useParams() as { code: string }

	const GET_COUNTRY = gql(`
  query GetCountry($code:ID!){
  country(code:$code){
    name,
    capital,
    currency,
    code
    emoji
    continent{
      code
    }
  }
}
`)
	const { loading, error, data } = useQuery(GET_COUNTRY, {
		variables: { code },
	})
	if (loading)
		return (
			<main>
				<Header destination='-1' />
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
			<Header destination={`/${data.country?.continent.code}`} />
			<Container fluid>
				<Text h1>{data.country?.name}</Text>
				<Text size='$7xl' css={{ textAlign: 'center' }}>
					{data.country?.emoji}
				</Text>
				<Text>Currency : {data.country?.currency}</Text>
				<Text>Capital : {data.country?.capital}</Text>
			</Container>
		</main>
	)
}

export default Country
