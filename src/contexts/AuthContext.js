import React, { useContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({});

    function signUp(displayName, email, password) {
        createUserProfileDocument(currentUser, { displayName })
        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            const user = auth.currentUser;
            return user.updateProfile({
                displayName: displayName
            })
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        setLoading(false)
        return () => {
            setState({});
        };
    }, [])


    const value = {
        state,
        currentUser,
        login,
        signUp,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

