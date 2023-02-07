import { DataGridProps } from '@mui/x-data-grid';
import React from 'react';
import DataGridStyled from './index.styled';

class DataGridCustom extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return <DataGridStyled {...this.props } />;
	}
}

type State = object

type Props = DataGridProps;

export default DataGridCustom;