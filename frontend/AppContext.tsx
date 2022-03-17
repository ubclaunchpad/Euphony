import React from "react";


export type GlobalContent = {
    authToken?: string | null;
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = React.createContext<GlobalContent>(
    {
        authToken: undefined,
        setAuthToken: () => { },
    }
);

export default AppContext;
