import { Box, Typography } from '@mui/material';
import React from 'react';
import TeamInterface from '../../interfaces/Team.interface';
import { GridValueGetterParams, GridRenderCellParams, ptBR, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import DataGridCustom from '../../components/DataGridCustom';
import LinkCustom from '../../components/LinkCustom';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import DeleteIconCustom from '../../components/icons/DeleteIconCustom';
import PlayerInterface from '../../interfaces/Player.interface';
import withRouter from '../../components/utils/WithRouter';
import { NavigateFunction } from 'react-router-dom';
import SpanLinkCustom from '../../components/SpanLinkCustom';

class PlayersPage extends React.Component<Props, States> {
	constructor(props) {
		super(props);

		this.state = {
			players: [],
		};

		this.getAllPlayers = this.getAllPlayers.bind(this);
		this.getAllPlayers();
	}

	async getAllPlayers() {
		const response = await fetch('/players');
		const json = await response.json();

		this.setState({
			players: json.players,
		});
	}

	async deletePlayer(id) {
		await fetch(`/players/${id}`, {
			method: 'DELETE',
		});
		
		this.getAllPlayers();
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
				field: 'age',
				headerName: 'Idade',
				width: 130,
				flex: 1,
			},
			{
				field: 'teamName',
				headerName: 'Time',
				flex: 1,
				valueGetter: (params: GridValueGetterParams) => params.row.team ? params.row.team.name : '',
				renderCell: (params: GridRenderCellParams) => (
					<SpanLinkCustom onClick={(event) => { event.stopPropagation(); return this.props.navigate(`/teams/${params.row.team.name}`);}}>
						{params.value}
					</SpanLinkCustom>
				),
			},
			{
				field: 'actions',
				type: 'actions',
				getActions: (params: GridRowParams) => [
					<GridActionsCellItem key={params.row.id} icon={<DeleteIconCustom />} onClick={() => this.deletePlayer(params.row.id)} label="Deletar" />
				],
			}
		];
	}

	render() {
		const { players, } = this.state;

		return (
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} m={3}>
				<span style={{ alignSelf: 'flex-start', }}>
					<LinkCustom to="/">
						<ArrowCircleLeftIconCustom style={{ alignSelf: 'flex-start', }}/>
					</LinkCustom>
				</span>

				<Typography variant='h3' textAlign="center" fontWeight={300}>Jogadores</Typography>
				<div style={{ height: 400, width: '100%', }}>
					<DataGridCustom
						rows={players}
						columns={this.getDataGridColumns()}
						rowsPerPageOptions={[1, 10, 50, 100]}
						localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
						onRowClick={(params) => this.props.navigate(`/players/${params.row.id}`)}
					/>
				</div>
				<LinkCustom to="/players/create">
					<ButtonCustom>
						Criar jogador
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
	players: PlayerInterface[]
};

export default withRouter(PlayersPage);