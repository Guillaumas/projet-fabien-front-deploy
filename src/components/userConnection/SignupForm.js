import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authenticate} from "../tools/requests";

function SignupForm({onSignup}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(
            '/api/auth/register',
            { username, password },
            (response) => {
                onSignup();
                navigate('/login');
            },
            (err) => {
                setError('Signup failed');
            }
        );
    };

    const handleSwitchToLogin = () => {
        navigate('/login');
    };


    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Signup</button>
                <br/>
                <button onClick={handleSwitchToLogin}>Switch to Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignupForm;