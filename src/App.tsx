import theme from './styles/themes/theme';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';

import { GlobalStyle } from './styles/global';
import { Router } from './routes/index.routes';
import { defaultTheme } from './styles/themes/default';
import { AuthContextProvider } from './contexts/AuthContext';
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
					</AuthContextProvider>
				</BrowserRouter>
				<ToastContainer />
			</ThemeProviderMUI>
		</ThemeProvider>
	);
}

export default App;

