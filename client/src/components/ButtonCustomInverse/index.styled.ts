import { Button, styled } from '@mui/material';

export default styled(Button)(({ theme, }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.common.white,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: '1.5em',
	padding: '0.5em 2em',
	width: 'fit-content',
	'&:hover': {
		color: theme.palette.common.black,
		backgroundColor: theme.palette.common.white,
	},
}));