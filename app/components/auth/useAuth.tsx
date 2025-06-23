// "use client";

// import { useState, useEffect } from 'react';

// export default function useAuth() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//     const checkAuth = () => {
//       const storedUser = localStorage.getItem('user');
//       setUser(storedUser ? JSON.parse(storedUser) : null);
//       setLoading(false);
//     };

//     checkAuth();
//     window.addEventListener('storage', checkAuth); 

//     return () => window.removeEventListener('storage', checkAuth);
//   }, []);

//   const login = (userData: any, token: string) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);
//     setUser(userData); 
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null); 
//     window.location.href = '/';
//   };

//   return { user, loading, login, logout };
// }