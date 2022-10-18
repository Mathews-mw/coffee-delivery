import { createTheme } from '@mui/material/styles';

export interface CustomTheme {
	MainButton: {
		bg: string;
		text: string;
		hover: string;
	};
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#DBAC2C',
			contrastText: '#FFF',
			dark: '#C47F17',
		},

		secondary: {
			main: '#4B2995',
			contrastText: '#FFF',
			dark: '#8047F8',
		},

		info: {
			main: '#E6E5E5',
			contrastText: '#574F4D',
			dark: '#D7D5D5',
		},
	},

	MainButton: {
		bg: '#fff',
		text: '#F4F4',
		hover: '#8047F8',
	},
});

export default theme;
