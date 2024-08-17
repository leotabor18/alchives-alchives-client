import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Routes from './routers';
import AuthContextProvider from './context/AuthContext';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <AuthContextProvider>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
