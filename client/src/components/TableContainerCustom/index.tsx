import { TableContainerProps } from '@mui/material';
import React from 'react';
import TableContainerStyled from './index.styled';

class TableContainerCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return <TableContainerStyled {...this.props } />;
	}
}

type State = object

type Props = TableContainerProps;

export default TableContainerCustom;