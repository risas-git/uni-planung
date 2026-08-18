import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';

const uniBielefeldTheme = {
  dark: false,
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    primary: '#1e3a8a',      // Uni Bielefeld / Academic Blue
    'primary-darken-1': '#172554',
    secondary: '#2563eb',    // Accent Blue
    'secondary-darken-1': '#1d4ed8',
    error: '#b91c1c',
    info: '#0284c7',
    success: '#15803d',
    warning: '#b45309',
  }
};

export default createVuetify({
  theme: {
    defaultTheme: 'uniBielefeldTheme',
    themes: {
      uniBielefeldTheme,
    },
  },
});
