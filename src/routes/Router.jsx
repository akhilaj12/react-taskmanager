import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Tasks from '../pages/Tasks';
import About from '../pages/About';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import TaskForm from '../components/TaskForm';
import ProtectedRoute from '../pages/ProtectedRoute';

export function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUpForm />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<Tasks />} />
                <Route path='/about' element={<About />} />
                <Route path='/taskform' element={<TaskForm />} />
            </Route>
            
            {/* 404 - Not Found */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

// Simple 404 Component
function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
        </div>
    );
}
