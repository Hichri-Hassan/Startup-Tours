import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserData, storeUserData, removeUserData } from '../services/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userData = await getUserData();
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        await storeUserData(userData);
        setUser(userData);
    };

    const logout = async () => {
        await removeUserData();
        setUser(null);
    };

    const updateUser = async (userData) => {
        await storeUserData(userData);
        setUser(userData);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateUser,
                isAuthenticated: !!user,
            }}>
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

export default AuthContext;
