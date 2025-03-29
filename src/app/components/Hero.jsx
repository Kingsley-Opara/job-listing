"use client"
import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import illustration from "@/app/images/Illustration.png"
import briefcaseDuotone from "@/app/images/briefcase-duotone.png"
import icon from "@/app/images/icon.png"
import Image from 'next/image';
import {useGlobalContext} from "@/app/context"
import { MdOutlinePeopleAlt } from "react-icons/md";
import { useRouter } from 'next/navigation';


function Hero() {
    const {data} = useGlobalContext()
    console.log(data)
    const [jobCount, setJobCount] = useState(0)
    const [companyCount, setCompanyCount] = useState(0)
    const [candidateCount, setCandidateCount] = useState(0)
    const [newJobCount, setNewJobCount] = useState(0)

    const [searchJobTitle, setSearchJobTitle] = useState('')

    const [searchJobLocation, setSearchJobLocation] = useState('')

    useEffect(() =>{
        setTimeout(()=>{
            if (jobCount < data.length){
                
                
                setJobCount(jobCount + 50)
    
            }
        }, 50)
        setTimeout(()=>{
            if (companyCount < 1000){
                setCompanyCount(companyCount + 50)
    
            }
        }, 50)
        setTimeout(()=>{
            if (candidateCount < 3000){
                setCandidateCount(candidateCount + 50)
    
            }
        }, 50)
        setTimeout(()=>{
            if (newJobCount < 2500){
                setNewJobCount(newJobCount + 50)
    
            }
        }, 50)
    }, [jobCount, data.length, companyCount, candidateCount])
    const router = useRouter()

    const handleSubmit = (e) =>{
        e.preventDefault()


        const name = searchJobTitle.trim()
        const location = searchJobLocation.trim()
        const fullJobSearch = `${name} ${location}`

        if (name){
            router.push(`/search?search=${encodeURIComponent(fullJobSearch)}`)
            
        }

    }



  return (
    <div className='bg-gray-200 text-black dark:bg-black'> 
        <div className='p-12 flex place-content-between max-md:flex-col-reverse'>
            <div className='ml-12 flex flex-col space-y-4 mt-18 max-md:ml-2'>
                <p className='text-3xl'>Find A Job that suits your interest & skills</p>
                <div>
                    <p className='text-sm font-thin text-black dark:text-white'>
                        At Jobpilot we help you with ease in finding and discovering your dream job.
                        
                    </p>
                    <p className='text-sm font-thin text-black dark:text-white'>
                        Jobpilot is all the way the best place to find remote jobs
                    </p>
                </div>
                <div className='flex flex-col space-y-3'>
                    <form action=""
                    onSubmit={(e) =>{handleSubmit(e)}} 
                    className='bg-white w-fit p-2 flex'>
                        <input type="text"
                            name='job-title' 
                            className=' focus:border-o focus:border-white transition-all bg-white
                            h-10 w-[16rem] rounded-sm border-0 border-gray-200 p-2 border-r-0 max-md:w-[10rem]' 
                            placeholder='Job Title, Keyword....'
                            value={searchJobTitle}
                            onChange={(e) =>{setSearchJobTitle(e.target.value)}}
                        />
                        <div className='flex space-x-2 max-sm:hidden'>
                            <IoLocationOutline className='text-xl mt-2'/>
                            <input type="text" 
                                className=' focus:border-o focus:border-white transition-all bg-white
                                h-10 w-[10rem] rounded-sm border-0 border-gray-200 p-2 max-md:w-[7rem]' 
                                placeholder='Your Location'
                                value={searchJobLocation}
                                onChange={(e) => {setSearchJobLocation(e.target.value)}}
                            />

                        </div>
                        <button 
                        type='submit'
                        className='cursor-pointer p-2 h-10 text-white transition-all duration-500
                        bg-blue-400 w-24 rounded-lg border-2 border-gray-200 hover:text-blue-500 hover:bg-white'>
                            Find Jobs
                        </button>


                    </form>
                    <p className='text-sm font-thin text-black dark:text-white'>
                        Suggestion: Designer, Programming, <span className='text-blue-400'>Digital Marketing,  </span>
                        Video Animation 
                    </p>

                </div>

                
            </div>
            <div>
                <Image src={illustration} alt="An illustration"/>

            </div>
        
        </div>
        <div className='mt-1 ml-30 p-5 flex space-x-5 max-md:flex-col max-md:ml-10 max-md:space-y-8'>
            <div className='bg-white w-[16rem] h-24 flex space-x-4  
            brightness-100 shadow-lg shadow-gray-200 dark:shadow-dark dark:bg-black dark:text-white dark:shadow-2xs'>
                <div className='mt-6 ml-6 bg-blue-200 w-15 h-12 p-1'>
                    <Image src={briefcaseDuotone} alt='s' height={40} width={40}/>
                </div>
                <div className='mt-5'>
                    <p className='text-2xl'>{jobCount}</p>
                    <p className='text-sm font-thin text-gray-400'>Live Job</p>

                </div>
                
            </div>
            <div className='bg-white w-[16rem] h-24 flex space-x-4 brightness-100 
            shadow-2xl shadow-white dark:shadow-dark dark:bg-black dark:text-white dark:shadow-2xs'>
                <div className='mt-6 ml-6 bg-blue-500 w-15 h-12 p-1'>
                    <Image src={icon} alt='s' height={40} width={40}/>
                </div>
                <div className='mt-5'>
                    <p className='text-2xl'>{companyCount}</p>
                    <p className='text-sm font-thin text-gray-400'>Companies</p>

                </div>
                
            </div>
            <div className='bg-white w-[16rem] h-24 flex space-x-4 brightness-100 shadow-lg 
            shadow-gray-200 dark:shadow-dark dark:bg-black dark:text-white dark:shadow-2xs'>
                <div className='mt-6 ml-6 bg-blue-200 w-15 h-12 p-1'>
                    <MdOutlinePeopleAlt className='text-2xl'/>
                </div>
                <div className='mt-5'>
                    <p className='text-2xl'>{candidateCount}</p>
                    <p className='text-sm font-thin text-gray-400'>Candidates</p>

                </div>
                
            </div>
            <div className='bg-white w-[16rem] h-24 flex space-x-4 brightness-100 shadow-lg 
            shadow-gray-200 dark:shadow-dark dark:bg-black dark:text-white dark:shadow-2xs'>
                <div className='mt-6 ml-6 bg-blue-200 w-15 h-12 p-1'>
                    <Image src={briefcaseDuotone} alt='s' height={40} width={40}/>
                </div>
                <div className='mt-5'>
                    <p className='text-2xl'>{newJobCount}</p>
                    <p className='text-sm font-thin text-gray-400'>New Jobs</p>

                </div>
                
            </div>
        </div>
    </div>  

    
  )
}

export default Hero
