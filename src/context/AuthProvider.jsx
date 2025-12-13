import { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase-init';
import axios from 'axios';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const saveUserToDB = async (userData) => {
        try {
            await axios.post('https://smart-home-ceremony-server.vercel.app/users', {
                uid: userData.uid,
                email: userData.email,
                displayName: userData.displayName || userData.email.split('@')[0],
                photoURL: userData.photoURL || null,
                emailVerified: userData.emailVerified || false,
                createdAt: new Date().toISOString(),
                role: 'user' 
            });
        } catch (error) {
            console.error('Error saving user to DB:', error);
        }
    };

    const createUser = async (email, password, displayName, photoURL = '') => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(result.user, { 
                displayName: displayName,
                photoURL: photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            });
            
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: displayName,
                photoURL: photoURL || result.user.photoURL,
                emailVerified: result.user.emailVerified
            };
            
            await saveUserToDB(userData);
            setUser(userData);
            return result;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (profileData) => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, {
                    displayName: profileData.displayName,
                    photoURL: profileData.photoURL
                });
 
                const updatedUserData = {
                    ...user,
                    displayName: profileData.displayName,
                    photoURL: profileData.photoURL
                };
                setUser(updatedUserData);
   
                await saveUserToDB(updatedUserData);
                
                return updatedUserData;
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName || result.user.email.split('@')[0],
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified
            };
            
            await saveUserToDB(userData);
            setUser(userData);
            return result;
        } finally {
            setLoading(false);
        }
    };

    const googleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName || result.user.email.split('@')[0],
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified
            };
            
            await saveUserToDB(userData);
            setUser(userData);
            return result;
        } finally {
            setLoading(false);
        }
    };
    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userData = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName || currentUser.email.split('@')[0],
                    photoURL: currentUser.photoURL,
                    emailVerified: currentUser.emailVerified
                };
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile, 
        signIn,
        googleSignIn,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;