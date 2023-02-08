import { Box, Typography } from '@mui/material';
import React from 'react';
import TeamInterface from '../../interfaces/Team.interface';
import { GridRowParams, GridRenderCellParams, ptBR, GridActionsCellItem } from '@mui/x-data-grid';
import DataGridCustom from '../../components/DataGridCustom';
import LinkCustom from '../../components/LinkCustom';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import DeleteIconCustom from '../../components/icons/DeleteIconCustom';
import SpanLinkCustom from '../../components/SpanLinkCustom';
import { NavigateFunction } from 'react-router-dom';
import withRouter from '../../components/utils/WithRouter';

class TeamsPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.getAllTeams = this.getAllTeams.bind(this);

		this.state = {
			teams: [],
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

	async deleteTeam(id) {
		await fetch(`/teams/${id}`, {
			method: 'DELETE',
		});
		
		this.getAllTeams();
	}

	getDataGridColumns() {
		return [
			{
				field: 'id',
				headerName: 'ID',
				minWidth: 80,
			},
			{
				field: 'name',
				headerName: 'Nome',
				minWidth: 130,
				flex: 1,
			},
			{
				field: 'players',
				headerName: 'Jogadores',
				minWidth: 130,
				flex: 1,
				renderCell: (params: GridRenderCellParams) => (
					params.value.map((player, index) => (
						<SpanLinkCustom key={index} onClick={(event) => { event.stopPropagation(); return this.props.navigate(`/players/${player.id}`);}}>
							{player.name + (index != params.value.length - 1 ? ',' : '')}&nbsp;
						</SpanLinkCustom>
					))
				),
			},
			{
				field: 'actions',
				type: 'actions',
				getActions: (params: GridRowParams) => [
					<GridActionsCellItem key={params.row.id} icon={<DeleteIconCustom />} onClick={() => this.deleteTeam(params.row.id)} label="Deletar" />
				],
			}
		];
	}

	render() {
		const { teams, } = this.state;

		return (
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} m={3}>
				<span style={{ alignSelf: 'flex-start', }}>
					<LinkCustom to="/">
						<ArrowCircleLeftIconCustom style={{ alignSelf: 'flex-start', }}/>
					</LinkCustom>
				</span>

				<Typography variant='h3' textAlign="center" fontWeight={300}>Times</Typography>
				<div style={{ height: 400, width: '100%', }}>
					<DataGridCustom
						rows={teams}
						columns={this.getDataGridColumns()}
						rowsPerPageOptions={[1, 10, 50, 100]}
						localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
						onRowClick={(params) => this.props.navigate(`/teams/${params.row.name}`)}
					/>
				</div>
				<LinkCustom to="/teams/create">
					<ButtonCustom>
						Criar time
					</ButtonCustom>
				</LinkCustom>
			</Box>
		);
	}

}

type Props = {
	navigate: NavigateFunction
};

type States = {
	teams: TeamInterface[]
};

export default withRouter(TeamsPage);