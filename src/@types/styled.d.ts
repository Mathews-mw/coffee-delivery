import 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import { defaultTheme } from '../styles/themes/default';
import { defaultThemeMUI } from '../styles/themes/defaultMUI';
import { CustomTheme } from '../styles/themes/theme';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}

declare module '@mui/material/styles' {
	interface Theme extends CustomTheme {}

	interface ThemeOptions extends CustomTheme {}
}
