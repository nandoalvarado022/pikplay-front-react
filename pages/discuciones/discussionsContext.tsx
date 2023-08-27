import React, { useState } from "react";
import { createContext, useContext } from "react";

export const DiscussionsContext = createContext({});

function Context({ children }) {
    const [message, setMessage] = useState('Hola Mundo');

    return <DiscussionsContext.Provider value={{ message, setMessage }}>
        {children}
    </DiscussionsContext.Provider>
}

export default Context;
