import { createContext } from "react";

export const MainContext = createContext();

export function MainContextProvider(props){
    let variable = "ejemplo de variable";

    return(
        <MainContext.Provider value={variable}>
            {props.children}
        </MainContext.Provider>
    )
}