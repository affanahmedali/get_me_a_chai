"use server"
import { auth, signIn, signOut } from "@/auth"

export const login = async () => {
    console.log('File: lib/actions/auth.js');
    console.log("login function called, which hides signIn imported from auth.js");
    await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
    console.log('File: lib/actions/auth.js');
    console.log("logout function called, which hides signOut imported from auth.js");
    await signOut({ redirectTo: "/" });
};

// checks whether user is logedin (authenticated)
export const authenticate = async () => {
    console.log("authenticate function called from lib/actions/auth.js");
    const session = await auth()
    console.log("session: ", session)
    if (session?.user) {
    console.log("user : ", session?.user)
        return true
    }
    else {
        return false
    }
}

// name of the loged in user
export const userName = async () => {
    console.log("userName function called from lib/actions/auth.js");
    const session = await auth()
    if (session?.user) {
        console.log("Session.user: ", session.user)
        console.log("Session.user.name: ", session.user.name)
        return session.user.name
    }
}

// get username, different from userName which is name (Affan Ahmed Ali)
export const getUsername = async () => {
    console.log("getUsername function called from lib/actions/auth.js");
    const session = await auth();
    console.log('session.user.email.split("@")[0]: ', session.user.email.split("@")[0])
    return session.user.email.split("@")[0];
}

// gets email of loged in user
export const getEmail = async() => {
    console.log("getEmail function called from lib/actions/auth.js");
    const session = await auth()
    console.log("session.user.email: ", session.user.email)
    return session.user.email
}