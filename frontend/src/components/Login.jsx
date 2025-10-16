import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import '@fontsource/inter'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        // Handle authentication here (API call if needed)
        navigate('/h'); // Direct to Home page
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#121212', // Dark background
        }}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        padding: '50px 40px',
                        background: 'rgba(30,30,47,0.95)', // Dark card background
                        borderRadius: 10,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        color: '#E0E0E0',
                    }}
                >
                    <Typography variant="h3" sx={{ marginBottom: 4, fontWeight: 'bold', color: '#FF3B30' }}>
                        COLLEGE BUS BOOKING
                    </Typography>

                    <Typography variant="h4" sx={{ marginBottom: 3 }}>
                        LOGIN HERE
                    </Typography>
                    
                    <form>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            name="Email"
                            onChange={inputHandler}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#aaa' },
                                '& .MuiInputBase-root': { backgroundColor: '#1E1E2F', borderRadius: 5, color: '#E0E0E0' },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            name="password"
                            onChange={inputHandler}
                            sx={{
                                '& .MuiInputLabel-root': { color: '#aaa' },
                                '& .MuiInputBase-root': { backgroundColor: '#1E1E2F', borderRadius: 5, color: '#E0E0E0' },
                            }}
                        />
                        
                        <Button
                            fullWidth
                            onClick={handleLogin}
                            sx={{
                                mt: 3,
                                backgroundColor: '#FF3B30',
                                color: '#fff',
                                borderRadius: 5,
                                paddingY: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    backgroundColor: '#e53935',
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                        >
                            LOGIN
                        </Button>

                        <Button
                            fullWidth
                            onClick={() => navigate('/s')}
                            sx={{
                                mt: 4,
                                backgroundColor: '#005f15ff',
                                color: '#ffffff',
                                borderRadius: 5,
                                paddingY: 1.5,
                                fontSize: '1.2rem',
                                '&:hover': { backgroundColor: '#073a00ff' },
                            }}
                        >
                            Signup
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
