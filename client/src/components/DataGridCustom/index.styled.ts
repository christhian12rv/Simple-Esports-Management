import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default styled(DataGrid)(({ theme, }) => ({
	backgroundColor: theme.palette.common.white,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: '1em',
	'& .MuiDataGrid-row:hover': {
		backgroundColor: theme.palette.primary.ultraLight,
	},
	'& .MuiDataGrid-cell:focus': {
		border: 'none',
		outline: 'none',
	},
}));