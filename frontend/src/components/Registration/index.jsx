import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Tab,
  Tabs,
  InputLabel,
  Input,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../api';

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
    profilePhoto: null,
    previewImage: null,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [tabValue, setTabValue] = useState(
    location.pathname === '/login' ? 1 : 0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (tabValue === 0) {
      setUserData({ ...userData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData({
      ...userData,
      profilePhoto: file,
      previewImage: URL.createObjectURL(file), // Создаем URL для предпросмотра
    });
  };

  const handleSubmit = async (e) => {
    if (tabValue === 0) {
      // Registration tab
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('birthDate', userData.birthDate);
      formData.append('gender', userData.gender);
      if (userData.profilePhoto) {
        formData.append('profilePhoto', userData.profilePhoto);
      }

      try {
        const response = await apiClient.post('/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        // alert('User registered successfully!');
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed!');
      }
    } else {
      e.preventDefault();
      // Handle login submission here
      try {
        const response = await apiClient.post('/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        navigate('/account');
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed!');
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Container component='main' maxWidth='xs'>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label='Registration' />
        <Tab label='Log In' />
      </Tabs>
      {/* Registration */}
      {tabValue === 0 && (
        <div>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Имя'
              name='name'
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              name='email'
              onChange={handleChange}
              autoComplete='off'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Пароль'
              name='password'
              type='password'
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Дата рождения'
              name='birthDate'
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Пол'
              name='gender'
              onChange={handleChange}
            />
            <InputLabel htmlFor='contained-button-file'>
              <Input
                accept='image/*'
                id='contained-button-file'
                multiple
                type='file'
                onChange={handleImageChange}
              />
              <Button
                sx={{
                  marginBottom: 2,
                  marginTop: 2,
                  backgroundColor: '#3CB300',
                }}
                variant='contained'
                component='span'
                fullWidth
              >
                Upload photo
              </Button>
            </InputLabel>

            {userData.previewImage && (
              <img
                src={userData.previewImage}
                alt='Preview'
                style={{ maxWidth: '100%', margin: '10px 0' }}
              />
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              style={{ marginBottom: '20px' }}
            >
              Register
            </Button>
          </form>
        </div>
      )}
      {/* Log In */}
      {tabValue === 1 && (
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email'
              name='email'
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Пароль'
              name='password'
              type='password'
              onChange={handleChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
            >
              Войти
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default Registration;
