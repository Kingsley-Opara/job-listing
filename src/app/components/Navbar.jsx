"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import briefcase from "@/app/images/briefcase.png"
import { CiSearch, CiLight, CiDark } from "react-icons/ci";
import { useGlobalContext } from '../context'
import Link from 'next/link'

function Navbar() {
    const [countries, setCountries] = useState([])

    const [selectedCountry, setSelectedCountry] = useState("")

    const [imageUrl, setImageUrl] = useState('')

    const{theme, toggleTheme} = useGlobalContext()
    const handleClick = () =>{
        if (theme === "light"){
            toggleTheme()
        }
        else{
            toggleTheme()
        }
    }
    useEffect(()=>{
        const fetchCountries = async function (){
            const response = await fetch("/api/countries", {next:{revalidate:86400}})
            const data = await response.json()
            setCountries(data)
             
        }
        fetchCountries()

        setTimeout(()=>{
            selectedCountry && setImageUrl(selectedCountry.flag)
        }, 1000)

    }, [])

  return (
    <nav className='bg-white p-4 w-full px-16 flex space-x-12 dark:bg-black dark:text-white'>
        <div className='flex space-x-2 text-black dark:text-white'>
            <Image src={briefcase} alt='The company logo' height={30} width={30} 
            className="cursor-pointer"
            onClick={()=>{fetchCountries()}}
            />

            <h5 className='text-2xl mt-2'>Jobpilot</h5>

        </div>
        <div className='max-md:hidden'>
            <form action="" >
                <div 
                className='flex'>
                    <div className='flex h-10 w-[12rem] rounded-2xl 
                    border-gray-200 border-2 p-2 dark:border-white
                    space-x-2'>
                    {/* {imageUrl && <Image src={imageUrl} alt='some'/>} */}
                    <h5></h5>
                    <select
                    className='w-full border-0 border-white dark:border-black dark:bg-black dark:text-white'
                    value={selectedCountry}
                    onChange={(e)=>{setSelectedCountry(e.target.value)}}
                    
                    >
                        {countries && countries.map((country) =>{
                            return(
                            
                                <option value={country.name} key={country.name}>
                                    {country.name} 
                                    
                                </option>
                            
                            )
                        })}

                    </select>
                    </div>
                    <div className='ml-3 h-10 w-[25rem] rounded-2xl border-2 border-gray-200 p-2 flex flex-space-x-2'>
                        <input type="text" 
                        className='w-full border-2 border-white focus:border-o 
                        focus:border-white transition-all' 
                        placeholder='Job Title, Keyword, company'
                        />
                        <CiSearch className='cursor-pointer text-xl'/>
                    </div>
                </div>

            </form>


        </div>
        <div className='flex space-x-4 max-lg:hidden'>
            <div>
                <button 
                className='cursor-pointer p-2 h-10 text-blue-500 transition-all duration-300
                bg-white w-28 rounded-2xl border-2 border-gray-200 hover:text-white hover:bg-blue-500'>
                    <Link href={'/search'} className=''>Search</Link>
                </button>
            </div>
            <div>
                <button 
                className='cursor-pointer p-2 h-10 text-white transition-all duration-500
                bg-blue-500 w-28 rounded-lg border-2 border-gray-200 hover:text-blue-500 hover:bg-white'>
                    Post A Jobs
                </button>
            </div>


        </div>

        <div className='ml-auto flex space-x-3'>
            {theme === "dark"?
            <CiLight className='text-3xl text-black cursor-pointer dark:text-white' onClick={()=>{handleClick()}}/>:
            <CiDark className='text-3xl text-black cursor-pointer dark:text-white' onClick={()=>{handleClick()}}/>}

            
        </div>


      
    </nav>
  )
}

export default Navbar
