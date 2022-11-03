import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
import { AuthContextProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import theme from './styles/themes/theme';
import 'react-toastify/dist/ReactToastify.css';
import { OrderContextProvider } from './contexts/OrderContext';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<ThemeProviderMUI theme={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<AuthContextProvider>
						<OrderContextProvider>
							<Router />
						</OrderContextProvider>
						<ToastContainer />
					</AuthContextProvider>
				</BrowserRouter>
			</ThemeProviderMUI>
		</ThemeProvider>
	);
}

export default App;
