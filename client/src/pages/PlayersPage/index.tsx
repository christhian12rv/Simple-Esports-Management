import { Box, Typography } from '@mui/material';
import React from 'react';
import TeamInterface from '../../interfaces/Team.interface';
import { GridValueGetterParams, GridRenderCellParams, ptBR } from '@mui/x-data-grid';
import DataGridCustom from '../../components/DataGridCustom';
import LinkCustom from '../../components/LinkCustom';
import ButtonCustom from '../../components/ButtonCustom';
import ArrowCircleLeftIconCustom from '../../components/icons/ArrowCircleLeftIconCustom';
import DeleteIconCustom from '../../components/icons/DeleteIconCustom';
import PlayerInterface from '../../interfaces/Player.interface';

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
		fetch(`/players/${id}`, {
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
			},
			{
				field: 'Deletar',
				headerName: '',
				sortable: false,
				filterable: false,
				valueGetter: (params: GridValueGetterParams) => params.row.id,
				renderCell: (params: GridRenderCellParams) => (
					<DeleteIconCustom onClick={() => this.deletePlayer(params.value)} />
				),
			}
		];
	}

	render() {
		const { players, } = this.state;

		return (
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} m={5}>
				<span style={{ alignSelf: 'flex-start', }}>
					<LinkCustom to="/">
						<ArrowCircleLeftIconCustom style={{ alignSelf: 'flex-start', }}/>
					</LinkCustom>
				</span>

				<Typography variant='h2' textAlign="center" fontWeight={300}>Jogadores</Typography>
				<div style={{ height: 400, width: '100%', }}>
					<DataGridCustom
						rows={players}
						columns={this.getDataGridColumns()}
						rowsPerPageOptions={[1, 10, 50, 100]}
						localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
					/>
				</div>
				<ButtonCustom>
					Criar jogador
				</ButtonCustom>
			</Box>
		);
	}

}

type Props = object;

type States = {
	players: PlayerInterface[]
};

export default PlayersPage;