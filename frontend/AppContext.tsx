import React from "react";


export type GlobalContent = {
    authToken?: string;
    setAuthToken: (c?: string) => void
}

const AppContext = React.createContext<GlobalContent>(
    {
        authToken: undefined,
        setAuthToken: (c?: string) => { },
    }
);

export default AppContext;
