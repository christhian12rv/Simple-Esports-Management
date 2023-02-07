import { ButtonProps } from '@mui/material';
import React from 'react';
import ButtonStyled from './index.styled';

class ButtonCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		const { onClick, } = this.props;
		return <ButtonStyled onClick={() => onClick}>{this.props.children}</ButtonStyled>;
	}
}

type State = object

type Props = ButtonProps;

export default ButtonCustom;