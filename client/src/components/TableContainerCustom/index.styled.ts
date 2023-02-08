import { styled, TableContainer } from '@mui/material';

export default styled(TableContainer)(({ theme, }) => ({
	backgroundColor: theme.palette.common.white,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: '1em',
	width: '100%',
}));