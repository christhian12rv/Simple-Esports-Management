import { styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default styled(DeleteIcon)(({ theme, }) => ({
	cursor: 'pointer',
	'& :hover': {
		color: theme.palette.primary.main,
	},
}));