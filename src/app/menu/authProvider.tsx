"use client"
// authService.ts (or directly in your component)
import { authFirebase, GoogleAuthProvider, signInWithPopup, signOut } from '../firebaseConfig';

import { clearToken, setToken, AuthState, getUser, User } from "@/redux/services/auth/authSlice";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from '@/redux';
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function AuthProvider() {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Optionally, render a skeleton or nothing until mounted
        return null;
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            const userCred = await signInWithPopup(authFirebase, provider);
            // The signed-in user info.
            const user = userCred.user;
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = await user?.getIdToken();
            dispatch(setToken({
                user: {
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL
                } as User,
                token: token
            } as AuthState));
            console.log("Signed in user:", user);
            console.log("ID Token:", await user.getIdToken()); // Get the ID token
            return user;
        } catch (error: any) {
            // Handle Errors here.
            const errorMessage = error.message;
            // The email of the user's account used.
            // The AuthCredential type that was used.
            console.error("Error signing in with Google:", errorMessage);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(authFirebase);

            dispatch(clearToken());
            console.log("User signed out.");
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };
    return (
        <>
            {user ? (
                <Button variant="contained" color="secondary" onClick={signOutUser}>
                    Logout{" "}
                    {user.photoURL && (
                        <Image
                            width={30}
                            height={30}
                            src={user.photoURL}
                            alt="User Avatar"
                            style={{ borderRadius: "50%", marginLeft: 8 }}
                        />
                    )}
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                    Login with Google
                </Button>
            )}
        </>
    );
}