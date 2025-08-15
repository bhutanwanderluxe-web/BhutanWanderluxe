import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Admin from './Admin';
import { useAuth } from '../AuthContext/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null; // or a loading state if needed

    return (
        <>
            {user.role === 'admin' ? <Admin /> : <Dashboard user={user} />}
        </>
    );
};

export default UserDashboard;
