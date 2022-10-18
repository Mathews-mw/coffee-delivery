import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
import theme from './styles/themes/theme';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<ThemeProviderMUI theme={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<AuthContextProvider>
						<Router />
					</AuthContextProvider>
				</BrowserRouter>
			</ThemeProviderMUI>
		</ThemeProvider>
	);
}

export default App;
