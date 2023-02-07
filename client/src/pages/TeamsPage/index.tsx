import { Box, Typography } from '@mui/material';
import React from 'react';
import TeamInterface from '../../interfaces/Team.interface';
import { GridValueGetterParams, GridRenderCellParams, ptBR } from '@mui/x-data-grid';
import DataGridCustom from '../../components/DataGridCustom';
import LinkCustom from '../../components/LinkCustom';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import DeleteIconCustom from '../../components/icons/DeleteIconCustom';

class TeamsPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.state = {
			teams: [],
		};

		this.getAllTeams = this.getAllTeams.bind(this);
		this.getAllTeams();
	}

	async getAllTeams() {
		const response = await fetch('/teams');
		const json = await response.json();

		this.setState({
			teams: json.teams,
		});
	}

	async deleteTeam(id) {
		fetch(`/teams/${id}`, {
			method: 'DELETE',
		});
		
		this.getAllTeams();
	}

	getDataGridColumns() {
		return [
			{
				field: 'id',
				headerName: 'ID',
				width: 80,
			},
			{
				field: 'name',
				headerName: 'Nome',
				width: 130,
				flex: 1,
			},
			{
				field: 'players',
				headerName: 'Jogadores',
				flex: 1,
				renderCell: (params: GridRenderCellParams) => (
					params.value.map((player, index) => (
						<LinkCustom key={player.id} to={`/player/${player.id}`}>
							{player.name + (index != params.value.length - 1 ? ',' : '')}&nbsp;
						</LinkCustom>
					))
				),
			},
			{
				field: 'Deletar',
				headerName: '',
				sortable: false,
				filterable: false,
				valueGetter: (params: GridValueGetterParams) => params.row.id,
				renderCell: (params: GridRenderCellParams) => (
					<DeleteIconCustom onClick={() => this.deleteTeam(params.value)} />
				),
			}
		];
	}

	render() {
		const { teams, } = this.state;

		return (
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} m={5}>
				<span style={{ alignSelf: 'flex-start', }}>
					<LinkCustom to="/">
						<ArrowCircleLeftIconCustom style={{ alignSelf: 'flex-start', }}/>
					</LinkCustom>
				</span>

				<Typography variant='h2' textAlign="center" fontWeight={300}>Times</Typography>
				<div style={{ height: 400, width: '100%', }}>
					<DataGridCustom
						rows={teams}
						columns={this.getDataGridColumns()}
						rowsPerPageOptions={[1, 10, 50, 100]}
						localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
					/>
				</div>
				<ButtonCustom>
					Criar time
				</ButtonCustom>
			</Box>
		);
	}

}

type Props = object;

type States = {
	teams: TeamInterface[]
};

export default TeamsPage;