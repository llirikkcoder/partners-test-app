// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField } from '@mui/material';
// import apiClient from '../../api';
// import './account.css';

// const Account = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const profileImageName = user?.profilePhoto?.split('\\').pop();
//   const [userInfo, setUserInfo] = useState({
//     name: user?.name || '',
//     password: '',
//     photo: null,
//     previewPhoto: null, // Для предпросмотра фотографии
//   });

//   useEffect(() => {
//     const userDetails = localStorage.getItem('user');
//     if (userDetails) {
//       setUser(JSON.parse(userDetails));
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   if (!user) return <div>Loading...</div>;

//   //   const handleChange = ({ target: { name, value, files } }) => {
//   //     if (name === 'photo') {
//   //       setUserInfo((prev) => ({
//   //         ...prev,
//   //         [name]: files ? files[0] : value,
//   //         previewPhoto: files ? URL.createObjectURL(files[0]) : null, // Создаем URL для предпросмотра
//   //       }));
//   //     } else {
//   //       setUserInfo((prev) => ({
//   //         ...prev,
//   //         [name]: value,
//   //       }));
//   //     }
//   //   };
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'photo') {
//       setUserInfo((prev) => ({
//         ...prev,
//         [name]: files ? files[0] : value,
//         previewPhoto: files ? URL.createObjectURL(files[0]) : null,
//       }));
//       e.preventDefault();
//     } else {
//       setUserInfo((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('name', userInfo.name);
//     data.append('password', userInfo.password);
//     if (userInfo.photo) {
//       data.append('profilePhoto', userInfo.photo);
//     }

//     try {
//       const {
//         data: { user: updatedUser },
//       } = await apiClient.put(`/users/${user._id}`, data);
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       setUserInfo({
//         ...userInfo,
//         password: '',
//         photo: null,
//         previewPhoto: null,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className='profile-container'>
//       <h1>User Profile</h1>
//       <div className='profile-details'>
//         <img
//           src={
//             user?.profilePhoto
//               ? `http://localhost:5000/uploads/${profileImageName}`
//               : '/default-profile.jpg'
//           }
//           alt='Profile'
//         />
//         <div className='details'>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       </div>

//       <form onSubmit={handleUpdate}>
//         <TextField
//           label='Change name'
//           name='name'
//           defaultValue={userInfo.name}
//           onChange={handleChange}
//           fullWidth
//           type='text'
//           autoComplete='off'
//           sx={{ marginBottom: '10px' }}
//         />
//         <TextField
//           label='Change password'
//           type='password'
//           name='password'
//           value={userInfo.password}
//           onChange={handleChange}
//           autoComplete='off'
//         />

//         <input
//           type='file'
//           id='profile-upload'
//           name='photo'
//           style={{ display: 'none' }}
//           onChange={handleChange}
//         />
//         <div className='upload-image-wrapper'>
//           <button
//             className='upload-image'
//             onClick={() => document.getElementById('profile-upload').click()}
//           >
//             Upload Profile Image
//           </button>
//           {userInfo.previewPhoto && (
//             <img
//               src={userInfo.previewPhoto}
//               alt='Preview'
//               style={{ maxWidth: '100px', marginTop: '10px' }}
//             />
//           )}
//         </div>
//         <div className='submit-button'>
//           <button type='submit'>Update Profile</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Account;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import apiClient from '../../api';
import './account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const profileImageName = user?.profilePhoto?.split('\\').pop();
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    password: '',
    photo: null,
    previewPhoto: null, // Для предпросмотра фотографии
  });

  useEffect(() => {
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const handleChange = ({ target: { name, value, files } }) => {
    if (name === 'photo') {
      setUserInfo((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
        previewPhoto: files ? URL.createObjectURL(files[0]) : null, // Создаем URL для предпросмотра
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', userInfo.name);
    data.append('password', userInfo.password);
    if (userInfo.photo) {
      data.append('profilePhoto', userInfo.photo);
    }

    try {
      const {
        data: { user: updatedUser },
      } = await apiClient.put(`/users/${user._id}`, data);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserInfo({
        ...userInfo,
        password: '',
        photo: null,
        previewPhoto: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='profile-container'>
      <h1>User Profile</h1>
      <div className='profile-details'>
        <img
          src={
            user?.profilePhoto
              ? `http://localhost:5000/uploads/${profileImageName}`
              : '/default-profile.jpg'
          }
          alt='Profile'
        />
        <div className='details'>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate}>
        <TextField
          label='Change name'
          name='name'
          defaultValue={userInfo.name}
          onChange={handleChange}
          fullWidth
          type='text'
          autoComplete='off'
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label='Change password'
          type='password'
          name='password'
          value={userInfo.password}
          onChange={handleChange}
          autoComplete='off'
        />

        <input
          ref={fileInputRef}
          type='file'
          id='profile-upload'
          name='photo'
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <div className='upload-image-wrapper'>
          <button
            className='upload-image'
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
          >
            Upload Profile Image
          </button>
          {userInfo.previewPhoto && (
            <img
              src={userInfo.previewPhoto}
              alt='Preview'
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
          )}
        </div>
        <div className='submit-button'>
          <button type='submit'>Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Account;
