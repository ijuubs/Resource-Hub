import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  setRole: (role: UserRole) => void;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string) => void;
  logout: () => void;
  toggleBookmark: (resourceId: string) => void;
  isBookmarked: (resourceId: string) => boolean;
}

const DEFAULT_USER: User = {
  id: 'usr-101',
  email: 'founder@resourcehub.dev',
  name: 'Alex Rivera',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'superadmin',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-08-01T00:00:00Z',
  bookmarks: ['res-1', 'res-4', 'res-7'],
  purchases: ['prod-1'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_USER);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Sync role helper
  const role: UserRole = currentUser ? currentUser.role : 'guest';
  const isLoggedIn = Boolean(currentUser);
  const isAdmin = role === 'admin' || role === 'superadmin';
  const isEditor = role === 'editor' || isAdmin;

  const setRole = (newRole: UserRole) => {
    if (newRole === 'guest') {
      setCurrentUser(null);
    } else {
      setCurrentUser((prev) => ({
        ...(prev || DEFAULT_USER),
        role: newRole,
      }));
    }
  };

  const loginWithGoogle = () => {
    setCurrentUser(DEFAULT_USER);
    setLoginModalOpen(false);
  };

  const loginWithEmail = (email: string) => {
    setCurrentUser({
      ...DEFAULT_USER,
      email,
      name: email.split('@')[0],
      role: 'user',
    });
    setLoginModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleBookmark = (resourceId: string) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }
    const exists = currentUser.bookmarks.includes(resourceId);
    const updatedBookmarks = exists
      ? currentUser.bookmarks.filter((id) => id !== resourceId)
      : [...currentUser.bookmarks, resourceId];

    setCurrentUser({
      ...currentUser,
      bookmarks: updatedBookmarks,
    });
  };

  const isBookmarked = (resourceId: string) => {
    return currentUser ? currentUser.bookmarks.includes(resourceId) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isLoggedIn,
        isAdmin,
        isEditor,
        loginModalOpen,
        setLoginModalOpen,
        setRole,
        loginWithGoogle,
        loginWithEmail,
        logout,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
