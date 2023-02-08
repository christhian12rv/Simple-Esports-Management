import { BoxProps } from '@mui/material';
import React from 'react';
import BoxStyled from './index.styled';

class SpanLinkCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return <BoxStyled component="span" {...this.props}>{this.props.children}</BoxStyled>;
	}
}

type State = object

type Props = BoxProps

export default SpanLinkCustom;