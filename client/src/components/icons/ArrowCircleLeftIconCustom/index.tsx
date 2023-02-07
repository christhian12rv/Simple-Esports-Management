import React from 'react';
import ArrowCircleLeftIconStyled from './index.styled';

class ArrowCircleLeftIconCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return <ArrowCircleLeftIconStyled style={this.props.style} />;
	}
}

type State = object

type Props = {
	style: any
};

export default ArrowCircleLeftIconCustom;