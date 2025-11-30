import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('hirepro_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem('hirepro_user', JSON.stringify(user));
    else localStorage.removeItem('hirepro_user');
  }, [user]);

  function signIn({ name, email, role }) {
    // mock token + profile
    const u = { name, email, role, token: 'mock-' + Math.random().toString(36).slice(2,9) };
    setUser(u);
    return u;
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}

export default AuthContext;
