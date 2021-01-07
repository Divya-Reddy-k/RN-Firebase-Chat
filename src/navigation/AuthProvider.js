import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [apiErrors, setApiErrors] = useState('');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            setApiErrors(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            setApiErrors(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {}
        },
        getApiErrors: async () => {
          return apiErrors;
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
