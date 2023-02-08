import { Slide, SnackbarProps } from '@mui/material';
import React from 'react';
import SnackbarStyled from './index.styled';

class SnackbarCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SnackbarStyled {...this.props} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
				autoHideDuration={6000} key={'top' + 'left'}>
				{this.props.children}
			</SnackbarStyled>
		);
	}
}

type State = object

type Props = SnackbarProps;

export default SnackbarCustom;