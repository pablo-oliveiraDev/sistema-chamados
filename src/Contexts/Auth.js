import { useEffect, useState, createContext } from "react";
import firebase from '../Services/FirebaseConnection';
import React from 'react';
import { toast } from "react-toastify";
export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loadingAuth, SetLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();

    }, [])


    //login user
    async function signin(email, password) {
        SetLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();

                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    avatarUrl: userProfile.data().avatarUrl,
                    email: userProfile.data().email
                };
                setUser(data);
                storageUser(data);
                SetLoadingAuth(false);
                toast.success('Seja bem vindo novamente!😉')

            })
            .catch((error) => {
                console.log(error)
                SetLoadingAuth(false)
                toast.error('Ops algo deu errado!🙁')
            })
    }
    //cadastro novo user
    async function signUp(email, password, nome) {
        SetLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,


                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data);
                        storageUser(data);
                        SetLoadingAuth(false);
                        toast.success('Seja bem vindo a nossa Plataforma!👍')
                    })
            })
            .catch((error) => {
                console.log(error);
                SetLoadingAuth(false);
                toast.error('Ops algo deu errado! 🙁')
            })


    }


    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //logout users
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            signin,
            loadingAuth,
            setUser,
            storageUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider