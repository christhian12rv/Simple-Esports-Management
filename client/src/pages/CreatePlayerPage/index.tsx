import { Alert, AlertColor, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography, FormHelperText, SelectChangeEvent } from '@mui/material';
import React from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import LinkCustom from '../../components/LinkCustom';
import SnackbarCustom from '../../components/SnackbarCustom';
import TeamInterface from '../../interfaces/Team.interface';

class CreatePlayerPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.getAllTeams = this.getAllTeams.bind(this);
		this.nameValidate = this.nameValidate.bind(this);
		this.nameErrorMessage = this.nameErrorMessage.bind(this);
		this.ageValidate = this.ageValidate.bind(this);
		this.ageErrorMessage = this.ageErrorMessage.bind(this);
		this.teamValidate = this.teamValidate.bind(this);
		this.teamErrorMessage = this.teamErrorMessage.bind(this);
		this.createPlayer = this.createPlayer.bind(this);

		this.state = {
			name: '',
			nameFocused: false,
			age: 0,
			ageFocused: false,
			teams: [],
			teamId: 0,
			teamFocused: false,
			snackbarOpen: false,
			snackbarMessage: '',
			snackbarType: 'success',
		};

		this.getAllTeams();
	}

	async getAllTeams() {
		const response = await fetch('/teams');
		const json = await response.json();

		this.setState({
			teams: json.teams,
		});
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

	ageValidate() {
		if (!this.state.ageFocused)
			return true;
			
		return this.state.age > 0;
	}

	ageErrorMessage() {
		if (!this.ageValidate())
			return 'A idade é inválida';

		return '';
	}

	teamValidate() {
		if (!this.state.teamFocused)
			return true;

		return this.state.teams.some(t => t.id === this.state.teamId);
	}

	teamErrorMessage() {
		if (!this.teamValidate())
			return 'Time inválido';

		return '';
	}

	async createPlayer() {
		const response = await fetch('/players', {
			method: 'POST',
			body: JSON.stringify({
				name: this.state.name,
				age: this.state.age,
				teamId: this.state.teamId,
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
		const { name, nameFocused, age, ageFocused, teams, teamId, teamFocused, snackbarOpen, snackbarMessage, snackbarType, } = this.state;

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
					<LinkCustom to="/players">
						<ArrowCircleLeftIconCustom style={{ alignSelf: 'flex-start', }}/>
					</LinkCustom>
				</span>

				<Typography variant='h3' textAlign="center" fontWeight={300}>Criar Jogador</Typography>
				
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

				<TextField
					error={!this.ageValidate()}
					helperText={this.ageErrorMessage()}
					required
					label="Idade"
					type="number"
					InputProps={{ inputProps: { min: 0, }, }}
					onBlur={() => !ageFocused && this.setState({ ageFocused: true, })}
					value={ age }
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({ age: Number(event.target.value), });
					}}
					style={{ width: '300px', }}
				/>

				<FormControl
					error={!this.teamValidate()}
					style={{ width: '300px', }}
				>
					<InputLabel id="demo-simple-select-helper-label">Time</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						value={teamId.toString()}
						label="Time"
						onChange={(event: SelectChangeEvent) => {
							this.setState({ teamId: Number(event.target.value), });
						}}
						onBlur={() => !teamFocused && this.setState({ teamFocused: true, })}
					>
						<MenuItem value="">
							<em>Nenhum</em>
						</MenuItem>
						{teams.map(t => (
							<MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
						))}
					</Select>
					<FormHelperText>{this.teamErrorMessage()}</FormHelperText>

				</FormControl>
				<ButtonCustom onClick={() => this.createPlayer()}>
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
	age: number
	ageFocused: boolean
	teams: TeamInterface[]
	teamId: number
	teamFocused: boolean
	snackbarOpen: boolean
	snackbarMessage: string
	snackbarType: AlertColor
};

export default CreatePlayerPage;