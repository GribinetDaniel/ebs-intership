import React from 'react'
import {User} from '../types/user'
import { Post } from '../types/post';
import { mainAxios } from '../utils/main-axios';

export interface ContextInterface {
    isAuth: boolean,
    user: User | undefined,
    users: User[] | undefined
    posts: Post[] | undefined,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>,
    setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>
}

export const userContextDefault: ContextInterface = {
    isAuth: false,
    user: undefined,
    users: undefined,
    posts: [],
    setIsAuth: () => {},
    setUser: () => {},
    setUsers: () => {},
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
    const [users, setUsers] = React.useState<User[]>()

    
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

    React.useEffect(() => {
        async function getUsers() {
            try {
                const response = await mainAxios.get('/users')
                setUsers(response.data)
            }
            catch(err) {
                console.log(err)
            }
        }
        getUsers();
    }, [])

    return <UserContext.Provider value={{isAuth, setIsAuth, user, setUser, posts, setPosts, users, setUsers}}>{children}</UserContext.Provider>
}