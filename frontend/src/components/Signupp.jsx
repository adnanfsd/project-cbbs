import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/inter';

const Signupp = () => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputs.Email,
          fullName: inputs['Full Name'],
          password: inputs.password,
          studentId: '2025ADN123', // You can dynamically generate this
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Signup successful!');
        navigate('/h'); // Navigate to Home page
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#121212',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: 5,
            background: 'rgba(30,30,47,0.95)',
            borderRadius: 10,
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#FF3B30' }}>
            COLLEGE BUS BOOKING
          </Typography>

          <Typography variant="h4" sx={{ marginBottom: 3, color: '#E0E0E0' }}>
            CREATE ACCOUNT
          </Typography>

          <form>
            <TextField
              fullWidth
              label="Email"
              name="Email"
              onChange={inputHandler}
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': { color: '#aaa' },
                '& .MuiInputBase-root': { backgroundColor: '#1E1E2F', borderRadius: 5, color: '#E0E0E0' },
              }}
            />
            <TextField
              fullWidth
              label="Full Name"
              name="Full Name"
              onChange={inputHandler}
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': { color: '#aaa' },
                '& .MuiInputBase-root': { backgroundColor: '#1E1E2F', borderRadius: 5, color: '#E0E0E0' },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={inputHandler}
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': { color: '#aaa' },
                '& .MuiInputBase-root': { backgroundColor: '#1E1E2F', borderRadius: 5, color: '#E0E0E0' },
              }}
            />

            {error && (
              <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              onClick={addData}
              sx={{
                mt: 3,
                backgroundColor: '#FF3B30',
                color: '#fff',
                borderRadius: 5,
                paddingY: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                '&:hover': { backgroundColor: '#e53935', boxShadow: '0 6px 15px rgba(0,0,0,0.3)' },
              }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" sx={{ mt: 2, color: '#777', fontSize: '0.9rem' }}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/')}
                style={{ color: '#FF3B30', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Login
              </span>
            </Typography>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Signupp;
