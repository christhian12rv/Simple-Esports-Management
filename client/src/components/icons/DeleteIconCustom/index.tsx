import React from 'react';
import DeleteIconStyled from './index.styled';

class DeleteIconCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return <DeleteIconStyled style={this.props.style} onClick={() => this.props.onClick()}/>;
	}
}

type State = object

type Props = {
	style?: any,
	onClick?: any,
};

export default DeleteIconCustom;