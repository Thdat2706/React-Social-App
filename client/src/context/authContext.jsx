import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async inputs => {
    const res = await axios.post(
      'http://localhost:8800/api/auth/login',
      inputs,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);

    setCurrentUser(prev => res.data);

  };

  // sau khi thang nay no bi re render thi currentUser moi cap nhat gia tri va chay vao useEffect
  useEffect(
    () => {
      localStorage.setItem('user', JSON.stringify(currentUser));
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
