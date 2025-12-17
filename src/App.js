import './App.css';
import {BrowserRouter as Router, NavLink } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './routes/Router';

function App() {
  const { token,logout } = useAuth();

  return(
    <Router>
      <nav style={{ display: 'flex', gap: '25px', padding: '10px', background: '#282c34', color: 'white' }}>
        <NavLink to="/" style={({isActive}) => ({ color: isActive ? 'yellow' : 'white', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
        {token && <NavLink to="/tasks" style={({isActive}) => ({ color: isActive ? 'yellow' : 'white', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal' })}>Tasks</NavLink>}
        {token && <NavLink to="/about" style={({isActive}) => ({ color: isActive ? 'yellow' : 'white', textDecoration: 'none', fontWeight: isActive ? 'bold' : 'normal' })}>About</NavLink>}
        {token && <NavLink to="/" onClick={logout} style={{ color: 'white', textDecoration: 'none', fontWeight: 'normal' }}>Logout</NavLink>}
      </nav>
      <ToastContainer />
      <AppRoutes />
    </Router>
  );
}

export default App;
