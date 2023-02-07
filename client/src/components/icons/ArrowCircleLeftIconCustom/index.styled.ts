import { styled } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default styled(ArrowCircleLeftIcon)(({ theme, }) => ({
	color: theme.palette.primary.main,
	cursor: 'pointer',
	fontSize: '1.8em',
	'& :hover': {
		color: theme.palette.primary.dark,
	},
}));