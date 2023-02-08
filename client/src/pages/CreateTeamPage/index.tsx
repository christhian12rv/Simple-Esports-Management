import { Alert, AlertColor, Box, TextField, Typography } from '@mui/material';
import React from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import LinkCustom from '../../components/LinkCustom';
import SnackbarCustom from '../../components/SnackbarCustom';

class CreateTeamPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.nameValidate = this.nameValidate.bind(this);
		this.nameErrorMessage = this.nameErrorMessage.bind(this);
		this.createTeam = this.createTeam.bind(this);
		this.state = {
			name: '',
			nameFocused: false,
			snackbarOpen: false,
			snackbarMessage: '',
			snackbarType: 'success',
		};
	}

	nameValidate() {
		if (!this.state.nameFocused)
			return true;
			
		return this.state.name.length >= 2;
	}

	nameErrorMessage() {
		if (!this.nameValidate())
			return 'O nome deve conter no mínimo 2 caracteres';

		return '';
	}

	async createTeam() {
		const response = await fetch('/teams', {
			method: 'POST',
			body: JSON.stringify({
				name: this.state.name,
			}),
		});

		const json = await response.json();

		let snackbarMessage = json.message;
		let snackbarType: AlertColor = 'success';

		if (json.errors)
			snackbarMessage = json.errors.map((e, index) => (<div key={index}>{e}</div>));

		if (response.status != 200)
			snackbarType = 'error';

		this.setState({ snackbarOpen: true, snackbarMessage, snackbarType, });
	}

	render() {
		const { name, nameFocused, snackbarOpen, snackbarMessage, snackbarType, } = this.state;

		return (
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} m={3}>
				<SnackbarCustom
					open={snackbarOpen}
					onClose={() => this.setState({ snackbarOpen: false, })}
				>
					<Alert onClose={() => this.setState({ snackbarOpen: false, })} severity={snackbarType} sx={{ width: '100%', }}>
						{snackbarMessage}
					</Alert>
				</SnackbarCustom>
				
				<span style={{ alignSelf: 'flex-start', }}>
					<LinkCustom to="/teams">
						<ArrowCircleLeftIconCustom style={{ alignSelf: 'flex-start', }}/>
					</LinkCustom>
				</span>

				<Typography variant='h3' textAlign="center" fontWeight={300}>Criar Time</Typography>
				<TextField
					error={!this.nameValidate()}
					helperText={this.nameErrorMessage()}
					required
					label="Nome"
					type="text"
					onBlur={() => !nameFocused && this.setState({ nameFocused: true, })}
					value={ name }
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({ name: event.target.value, });
					}}
					style={{ width: '300px', }}
				/>

				<ButtonCustom onClick={() => this.createTeam()}>
					Criar
				</ButtonCustom>
			</Box>
		);
	}

}

type Props = object;

type States = {
	name: string
	nameFocused: boolean
	snackbarOpen: boolean
	snackbarMessage: string
	snackbarType: AlertColor
};

export default CreateTeamPage;