import { styled, Box } from '@mui/material';

export default styled(Box)(({ theme, }) => ({
	textDecoration: 'none',
	color: theme.palette.link.main,
	'&:hover': {
		color: theme.palette.link.dark,
	},
}));