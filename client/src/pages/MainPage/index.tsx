import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import ButtonCustomInverse from '../../components/ButtonCustomInverse';
import LinkCustom from '../../components/LinkCustom';

class MainPage extends React.Component {

	render() {
		return (
			<Box display="flex" flexDirection="column" gap={5} alignItems="center" justifyContent="center" height="100vh">
				<Box display="flex" flexDirection="column" gap={3} >
					<Typography variant="h2">Gerenciador de E-sports</Typography>
					<Divider sx={{ bgcolor: 'primary.main', }}/>
				</Box>
				<Box display="flex" gap={3} alignItems="center" justifyContent="center">
					<LinkCustom to="/teams">
						<ButtonCustom>
						Times
						</ButtonCustom>
					</LinkCustom>
					<LinkCustom to="/players">
						<ButtonCustomInverse>
							Jogadores
						</ButtonCustomInverse>
					</LinkCustom>
				</Box>
			</Box>
		);
	}

}

export default MainPage;