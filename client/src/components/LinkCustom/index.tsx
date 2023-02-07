import React from 'react';
import LinkStyled from './index.styled';

class LinkCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		const { to, } = this.props;
		return <LinkStyled to={to}>{this.props.children}</LinkStyled>;
	}
}

type State = object

type Props = {
	children: any,
	to: string
}

export default LinkCustom;