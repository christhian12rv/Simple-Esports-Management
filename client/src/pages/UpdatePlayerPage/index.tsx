import { Alert, AlertColor, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography, SelectChangeEvent, FormHelperText } from '@mui/material';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import LinkCustom from '../../components/LinkCustom';
import SnackbarCustom from '../../components/SnackbarCustom';
import TableContainerCustom from '../../components/TableContainerCustom';
import withRouter from '../../components/utils/WithRouter';
import PlayerInterface from '../../interfaces/Player.interface';
import TeamInterface from '../../interfaces/Team.interface';

class UpdateTeamPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.getPlayer = this.getPlayer.bind(this);
		this.getAllTeams = this.getAllTeams.bind(this);
		this.nameValidate = this.nameValidate.bind(this);
		this.nameErrorMessage = this.nameErrorMessage.bind(this);
		this.ageValidate = this.ageValidate.bind(this);
		this.ageErrorMessage = this.ageErrorMessage.bind(this);
		this.teamValidate = this.teamValidate.bind(this);
		this.teamErrorMessage = this.teamErrorMessage.bind(this);
		this.updatePlayer = this.updatePlayer.bind(this);

		this.state = {
			player: {
				id: this.props.params.id,
				name: '',
				age: 0,
				teamId: 0,
			},
			nameFocused: false,
			ageFocused: false,
			teams: [],
			teamFocused: false,
			snackbarOpen: false,
			snackbarMessage: '',
			snackbarType: 'success',
		};

		this.getPlayer();
		this.getAllTeams();
	}

	async getPlayer() {
		const response = await fetch(`/players/${this.props.params.id}`);
		const json = await response.json();
	
		if (!json.player)
			return this.props.navigate('/players');

		const player = json.player;
		if (!player.teamId)
			player.teamId = 0;

		this.setState({ player, });
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
			
		return this.state.player.name.length >= 2;
	}

	nameErrorMessage() {
		if (!this.nameValidate())
			return 'O nome deve conter no mínimo 2 caracteres';

		return '';
	}

	ageValidate() {
		if (!this.state.ageFocused)
			return true;
			
		return this.state.player.age > 0;
	}

	ageErrorMessage() {
		if (!this.ageValidate())
			return 'A idade é inválida';

		return '';
	}

	teamValidate() {
		if (!this.state.teamFocused)
			return true;

		return this.state.teams.some(t => t.id === this.state.player.teamId);
	}

	teamErrorMessage() {
		if (!this.teamValidate())
			return 'Time inválido';

		return '';
	}

	async updatePlayer() {
		const response = await fetch(`/players/${this.state.player.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				name: this.state.player.name,
				age: this.state.player.age,
				teamId: this.state.player.teamId,
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
		const { player, nameFocused, ageFocused, teams, teamFocused, snackbarOpen, snackbarMessage, snackbarType, } = this.state;
		console.log(player);
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

				<Typography variant='h3' textAlign="center" fontWeight={300}>Jogador</Typography>

				<TextField
					label="ID"
					type="text"
					disabled
					value={player.id }
					style={{ width: '300px', }}
				/>

				<TextField
					error={!this.nameValidate()}
					helperText={this.nameErrorMessage()}
					required
					label="Nome"
					type="text"
					onBlur={() => !nameFocused && this.setState({ nameFocused: true, })}
					value={player.name }
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({ player: { ...player, name: event.target.value, }, });
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
					value={ player.age }
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({ player: { ...player, age: Number(event.target.value), }, });
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
						value={player.teamId.toString()}
						label="Time"
						onChange={(event: SelectChangeEvent) => {
							this.setState({ player: { ...player, teamId: Number(event.target.value), }, });
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
				
				<ButtonCustom onClick={() => this.updatePlayer()}>
					Atualizar
				</ButtonCustom>
			</Box>
		);
	}

}

type Props = {
	params: {
		id: number
	}
	navigate: NavigateFunction
};

type States = {
	player: PlayerInterface
	nameFocused: boolean
	ageFocused: boolean
	teams: TeamInterface[]
	teamFocused: boolean
	snackbarOpen: boolean
	snackbarMessage: string
	snackbarType: AlertColor
};

export default withRouter(UpdateTeamPage);