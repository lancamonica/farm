// internal
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './routes/Root';
// external
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1d4a81',
  },
  fontFamily: 'Roboto, sans-serif',
  appBar: {
    height: 50,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Root />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
