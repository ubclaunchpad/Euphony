import React from "react";


export type GlobalContent = {
    authToken?: string | null;
    refreshToken?: string | null;
    userID?: string | null;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>
    setUserID: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = React.createContext<GlobalContent>(
    {
        authToken: undefined,
        refreshToken: undefined,
        userID: undefined,
        setRefreshToken: () => { },
        setAuthToken: () => { },
        setUserID: () => { },
    }
);

export default AppContext;
