import { Alert, AlertColor, Box, Table, TableHead, TableRow, TableBody, TableCell, TextField, Typography } from '@mui/material';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import LinkCustom from '../../components/LinkCustom';
import SnackbarCustom from '../../components/SnackbarCustom';
import TableContainerCustom from '../../components/TableContainerCustom';
import withRouter from '../../components/utils/WithRouter';
import TeamInterface from '../../interfaces/Team.interface';

class UpdateTeamPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.nameValidate = this.nameValidate.bind(this);
		this.nameErrorMessage = this.nameErrorMessage.bind(this);
		this.updateTeam = this.updateTeam.bind(this);
		this.state = {
			team: {
				id: -1,
				name: this.props.params.name,
				players: [],
			},
			nameFocused: false,
			snackbarOpen: false,
			snackbarMessage: '',
			snackbarType: 'success',
		};

		this.getTeam();
	}

	async getTeam() {
		const response = await fetch(`/teams/name/${this.props.params.name}`);
		const json = await response.json();
	
		if (!json.team)
			return this.props.navigate('/teams');

		this.setState({
			team: json.team,
		});
	}

	nameValidate() {
		if (!this.state.nameFocused)
			return true;
			
		return this.state.team.name.length >= 2;
	}

	nameErrorMessage() {
		if (!this.nameValidate())
			return 'O nome deve conter no mínimo 2 caracteres';

		return '';
	}

	async updateTeam() {
		const response = await fetch(`/teams/${this.state.team.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				name: this.state.team.name,
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
		const { team, nameFocused, snackbarOpen, snackbarMessage, snackbarType, } = this.state;
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

				<Typography variant='h3' textAlign="center" fontWeight={300}>Time</Typography>
				<TextField
					label="ID"
					type="text"
					disabled
					value={ team.id }
					style={{ width: '300px', }}
				/>
				<TextField
					error={!this.nameValidate()}
					helperText={this.nameErrorMessage()}
					required
					label="Nome"
					type="text"
					onBlur={() => !nameFocused && this.setState({ nameFocused: true, })}
					value={ team.name }
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({ team: { ...team, name: event.target.value, }, });
					}}
					style={{ width: '300px', }}
				/>
				{(!!team.players && team.players.length > 0) &&
					<TableContainerCustom style={{ maxWidth: '300px', }}>
						<Table aria-label="simple table" size="small">
							<TableHead>
								<TableRow>
									<TableCell align="center">Jogadores</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{team.players.map((player) => (
									<TableRow
										key={player.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0, }, }}
									>
										<TableCell component="th" scope="player" align="center">
											<LinkCustom key={player.id} to={`/players/${player.id}`}>
												{player.name}
											</LinkCustom>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainerCustom>
				}
				
				<ButtonCustom onClick={() => this.updateTeam()}>
					Atualizar
				</ButtonCustom>
			</Box>
		);
	}

}

type Props = {
	params: {
		name: string
	}
	navigate: NavigateFunction
};

type States = {
	team: TeamInterface
	nameFocused: boolean
	snackbarOpen: boolean
	snackbarMessage: string
	snackbarType: AlertColor
};

export default withRouter(UpdateTeamPage);