import React from 'react';
import DeleteIconStyled from './index.styled';

class DeleteIconCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return <DeleteIconStyled/>;
	}
}

type State = object

type Props = object

export default DeleteIconCustom;