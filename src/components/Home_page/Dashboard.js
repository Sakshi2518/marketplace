import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/dashboard', { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data.valid) {
                    setMessage(res.data.message);
                } else {
                    navigate('/');
                }
            })
            .catch(err => {
                console.error(err);
                navigate('/');  // Redirect to login page on error
            });
    }, []); // Empty dependency array to run effect only once

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
