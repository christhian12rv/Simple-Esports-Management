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
import { SnackbarProvider } from 'notistack';
import CreateTeamPage from './pages/CreateTeamPage';
import UpdateTeamPage from './pages/UpdateTeamPage';
import CreatePlayerPage from './pages/CreatePlayerPage';
import UpdatePlayerPage from './pages/UpdatePlayerPage';

class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3}>
					<GlobalStyles styles={global} />
					<BrowserRouter>
						<Routes>
							<Route index element={<MainPage />} />
							<Route path='/teams' element={<TeamsPage />} />
							<Route path='/teams/create' element={<CreateTeamPage />} />
							<Route path='/teams/:name' element={<UpdateTeamPage />} />
							<Route path='/players' element={<PlayersPage />} />
							<Route path='/players/create' element={<CreatePlayerPage />} />
							<Route path='/players/:id' element={<UpdatePlayerPage />} />
						</Routes>
					</BrowserRouter>
				</SnackbarProvider>
			</ThemeProvider>
		);
	}
}

export default App;
