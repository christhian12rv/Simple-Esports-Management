import { styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default styled(DeleteIcon)(({ theme, }) => ({
	color: theme.palette.error.main,
	cursor: 'pointer',
	fontSize: '1.8em',
	'& :hover': {
		color: theme.palette.primary.dark,
	},
}));