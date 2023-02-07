import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import PlayersPage from './pages/PlayersPage';
import TeamsPage from './pages/TeamsPage';
import global from './styles/global';
import theme from './styles/theme';

class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyles styles={global} />
				<BrowserRouter>
					<Routes>
						<Route index element={<MainPage />} />
						<Route path='/teams' element={<TeamsPage />} />
						<Route path='/players' element={<PlayersPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		);
	}
}

export default App;
