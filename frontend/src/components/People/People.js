import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import './people.css';

const People = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage?.getItem('user'));
  console.log('🚀 ~ People ~ currentUser:', currentUser);

  useEffect(() => {
    const fetchUsers = async (currentUser) => {
      try {
        // 1. Получаем строку из localStorage
        const userString = localStorage.getItem('user');

        // 2. Преобразуем строку в объект JSON (если она существует)
        const currentUser = userString ? JSON.parse(userString) : null;

        const response = await apiClient.get('/users');
        setUsers(
          response.data.filter((user) => user?._id !== currentUser?._id)
        );
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers(currentUser);
  }, []);

  const calculateAge = (birthDate) => {
    const birthday = new Date(birthDate);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className='users-container'>
      {users.map((user) => (
        <div key={user._id} className='user-card'>
          {user?.profilePhoto !== null &&
            user?.profilePhoto?.includes('.jpg') && (
              <img
                src={`http://localhost:5000/uploads/${user?.profilePhoto
                  ?.split('\\')
                  .pop()}`}
                alt='Profile'
              />
            )}
          <h3>{user.name}</h3>
          <p>Возраст: {calculateAge(user.birthDate)}</p>
        </div>
      ))}
    </div>
  );
};

export default People;
