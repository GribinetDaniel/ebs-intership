import React from 'react'
import {User} from '../types/user'
import { Post } from '../types/post';
import { mainAxios } from '../utils/mainAxios';

export interface ContextInterface {
    isAuth: boolean,
    user: User | undefined,
    posts: Post[] | undefined,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
    setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>
}

export const userContextDefault: ContextInterface = {
    isAuth: false,
    user: undefined,
    posts: [],
    setIsAuth: () => {},
    setUser: () => {},
    setPosts: () => {}
}

export const UserContext = React.createContext<ContextInterface>(userContextDefault);

export interface UserContextProviderProps {
    children: React.ReactNode
}

export function UserContextProvider({children}: UserContextProviderProps){
    const [isAuth, setIsAuth] = React.useState(localStorage.getItem("token") != null)
    const [user, setUser] = React.useState<User>()
    const [posts, setPosts] = React.useState<Post[]>()

    React.useEffect(() => {
        async function getUser() {
            try{
                const response = await mainAxios.get('/account')
                setUser(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getUser();
    }, [])


    React.useEffect(() => {
        async function getPosts() {
            try{
                const response = await mainAxios.get('/posts')
                setPosts(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        getPosts();
    }, [])

    return <UserContext.Provider value={{isAuth, setIsAuth, user, setUser, posts, setPosts}}>{children}</UserContext.Provider>
}