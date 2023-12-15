import { createContext, useState, useContext } from "react";

const LogInContext = createContext();

export const LogInProvider = ({children}) =>{
    const token = localStorage.getItem('accessToken')
    const [isLogIn, setIsLogIn] = useState(token?true:false)  
    
    const setLogIn = ()=>{
        setIsLogIn(true)
    }
    const setLogOut=()=>{
        setIsLogIn(false)
    }

    return (
        <LogInContext.Provider value={{isLogIn, setLogIn, setLogOut}}>
            {children}
        </LogInContext.Provider>
    )
}

// export default LogInContext;
export const useLoginContext =()=>{
    const logInContext = useContext(LogInContext)
    if(!logInContext){
        throw new Error('useLogin은 반드시 LogInProvider내에서 사용되어야 합니다.')
    }
    return logInContext
}