import create from 'zustand'
import {persist, devtools} from 'zustand/middleware'
export interface StoreState{
    user: string,
    password: string,
    loggedIn: boolean,
    createdUser: Array<object>,
    favorites: Array<object>,
    movieTitle: string,
    updateUser: (user:string) => void,
    updatePassword: (password:string) => void,
    updateLogIn: (loggedIn:boolean) => void,
    addCreatedUser: (createdUser:Array<object>) => void,
    updateMovieTitle:(movieTitle: string) => void,

}
const useUserStore = create<StoreState>()(
    persist(
        devtools(
        (set,get) => ({
    user: '',
    password: '',
    favorites: [{}],
    loggedIn: false,
    createdUser: [{user: '', password: '', favorites: [{}]}],
    movieTitle: '',
    updateUser: (user) => set(()=>({user})),
    updatePassword: (password) => set(() =>({password})),
    updateLogIn: (loggedIn) => set(()=>({loggedIn:!loggedIn})),
    addCreatedUser: (createdUser) => set(()=>({createdUser})),
    updateMovieTitle: (movieTitle) => set(()=>({movieTitle}))
    
})),
{
    name: 'user-storage',
    getStorage: () => sessionStorage
}
))

export default useUserStore;
