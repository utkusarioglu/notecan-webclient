import React, { useEffect, useState, createContext } from "react";
import {Auth} from "./firebase";



type TcurrentUser = firebase.User | null
interface IAuthContext {
    currentUser?: TcurrentUser,
}

const AuthContext = createContext<IAuthContext>({})

function AuthProvider({children}: {children: JSX.Element[] | JSX.Element}) {

    const [currentUser, setCurrentUser] = useState<TcurrentUser>(null);
    // const [currentUserDb, setCurrentUserDb] = useState(null);

    const setupUser = async (currentUser: TcurrentUser) => {
        setCurrentUser(currentUser);
        const uid = currentUser?.uid
        
        if(uid) {
            // const user_data = (await (await Firestore.collection("users").doc(uid)).get()).data()
            // const trees = (await (await Firestore.collection("trees").doc(uid)).get()).data()
            // console.log("user data\n", user_data, uid, "\n", trees)
            // setCurrentUserDb();

        }
        // Firebase.database()
    }

    useEffect(() => {
        Auth.onAuthStateChanged(setupUser);
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}



export {
    AuthProvider, 
    AuthContext,
}