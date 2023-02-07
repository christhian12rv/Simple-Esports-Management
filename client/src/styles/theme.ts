import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
	interface Palette {
    link: Palette['primary'];
  }
  interface PaletteOptions {
    link?: PaletteOptions['primary'];
  }
  interface PaletteColor {
    ultraLight: string;
  }
  interface SimplePaletteColorOptions {
    ultraLight?: string;
  }
}

export default createTheme({
	palette: {
		primary: {
			main: '#4527a0',
			ultraLight: '#c5cae9',
		},
		link: {
			main: '#304ffe',
			dark: '#0026ca',
		},
	},
});