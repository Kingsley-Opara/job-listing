"use client"
import { useState, useContext, useEffect, createContext } from "react";


const GlobalStateContext = createContext()



export const GlobalStateProvider = ({children}) =>{
    
    const [theme, setTheme] = useState("light")
    const [data, setData] = useState("")
    useEffect(() =>{
        const getData = async function (){
            try{
            const domain ="/api/jobs"
            const response = await fetch(domain, {next:{revalidate: 86400}})
            const data = await response.json()
        
            setData(data)
            }catch(error){
                console.log('error')
            }
            
        
        }
        getData()



        const storedTheme = localStorage.getItem("theme")
        if(storedTheme){
            document.documentElement.classList.add(storedTheme)
            setTheme(storedTheme)

        }
        

    }, [data])
    const toggleTheme = () =>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        localStorage.setItem('jobs', [])

        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
    }

    return (
        <GlobalStateContext.Provider value={{theme, toggleTheme, data}}>
            {children}

        </GlobalStateContext.Provider>
    )
}

export const useGlobalContext = ()=> useContext(GlobalStateContext)