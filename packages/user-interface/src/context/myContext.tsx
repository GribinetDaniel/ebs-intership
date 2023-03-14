import React from 'react'
import { Token } from '../types/token'
import {User} from '../types/user'
import { mainAxios } from '../utils/mainAxios';

export interface IUserInterface {
    isAuth: boolean,
    user: User | undefined,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const userContextDefault: IUserInterface = {
    isAuth: false,
    user: undefined,
    setIsAuth: () => {},
    setUser: () => {}
}

export const UserContext = React.createContext<IUserInterface>(userContextDefault);

export interface UserContextProviderProps {
    children: React.ReactNode
}

export  function UserContextProvider({children}: UserContextProviderProps){
    const [isAuth, setIsAuth] = React.useState(localStorage.getItem("token") != null)
    const [user, setUser] = React.useState<User>()

    React.useEffect(() => {
        mainAxios.get('/account', {headers:{
            Authorization: localStorage.getItem("token")
        }})
        .then(response => setUser(response.data))
        .catch(err => console.log(err))
    }, [])
    return <UserContext.Provider value={{isAuth, setIsAuth, user, setUser}}>{children}</UserContext.Provider>
}