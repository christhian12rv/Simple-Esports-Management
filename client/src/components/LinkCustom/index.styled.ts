import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export default styled(Link)(({ theme, }) => ({
	textDecoration: 'none',
	color: theme.palette.link.main,
	'&:hover': {
		color: theme.palette.link.dark,
	},
}));