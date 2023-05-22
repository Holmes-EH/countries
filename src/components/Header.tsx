import { useNavigate } from 'react-router-dom'
import { Button, Navbar } from '@nextui-org/react'

const Header = ({ destination }: { destination: string }) => {
	const navigate = useNavigate()
	return (
		<Navbar>
			<Button
				size='sm'
				color='gradient'
				auto
				onPress={() => navigate(destination)}
			>
				Back
			</Button>
		</Navbar>
	)
}

export default Header
