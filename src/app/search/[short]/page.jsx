"use client"
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoClipboardOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { LuBookOpen } from "react-icons/lu";
import { GrLanguage } from "react-icons/gr";
import { FaRegCopy } from "react-icons/fa";
import { GlobalStateProvider } from '@/app/context';

function Page() {
    const searchParams = useSearchParams()
    const data = searchParams.get('data')
    const router = useRouter()
    const [reteriveJob, setReterieveJob] = useState([])

    const job = data ? JSON.parse(decodeURIComponent(data)) : null


    useEffect(()=>{
        
        if(job){
            const getData = async function (){
                const res = await fetch(`/api/jobs/${job}`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({"name": job})
                })
                const info = await res.json()
                setReterieveJob(info)
                console.log(info)
                 
            }
            getData()
        }

        
    }, [job])

    
  return (
    <GlobalStateProvider>

        <main className='dark:bg-black text-black dark:text-white'>
                
            <Navbar/>
            <div className='flex place-content-between bg-gray-200 p-5 dark:bg-gray-700 dark:text-white'>
                <Link href={'/search'}>Find Job</Link>

                <div className='flex space-x-3'>
                    <Link href={'/'}>Home</Link>
                    <p>/</p>
                    <Link href={'/'}>Saved Jobs</Link>

                </div>
            </div>
            <div>
                {reteriveJob.map((info)=>{
                    return(
                        <div className='grid grid-cols-2 mt-1 bg-white dark:bg-black 
                        p-5 max-md:grid-cols-1' key={info.id}>
                            <div>
                                <div className='flex space-x-5'>
                                    <Image src={info['company_logo']} height={70} width={70} className="" alt='logo'/>
                                    <div className='dark:text-white text-black'>
                                        <p className='text-2xl text-bold dark:text-white text-black'>{info.title}</p>
                                        
                                        
                                        <div className='flex space-x-3'>
                                            
                                            <p className='text-gray-900 font-light mt-2 dark:text-white'>
                                                at <span>{info["company_name"]}</span> 
                                                
                                            </p>
                                            <div className='bg-green-400 w-24 h-8 text-center text-white'>
                                                <p className='pt-2'>{info['job_type']}</p>
                                            </div>
                                            <div className='bg-pink-100 w-18 h-6 text-center text-red-400 rounded-3xl p-1 mt-2'>
                                                <p className='font-light text-sm'>Featured</p>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                                
                                <div className='mt-10 p-5 dark:text-white text-black'>
                                    <h5 className='text-2xl font-medium'>Job Description</h5>

                                    <div className='prose max-w-none p-10 bg-white shadow-md rounded-lg h-fit
                                    dark:bg-black text-black dark:text-white
                                    ' >
                                        <div 
                                            dangerouslySetInnerHTML={{__html: info.description}}
                                            className='mt-2 flex flex-col space-y-5 '
                                    
                                        />

                                    </div>



                                </div>
                            </div>
                            <div className='ml-auto'>
                                <div className='flex space-x-3'>
                                    <div className='p-2 bg-gray-200'>
                                        <IoClipboardOutline className='text-xl mt-2 text-blue-400 cursor-pointer'/>
                                    </div>
                                    
                                    <button
                                        onClick={()=>{router.push('/apply')}} 
                                        className='cursor-pointer p-2 h-10 text-white 
                                        transition-all duration-500
                                        bg-blue-500 w-40 rounded-lg border-2 space-x-2
                                        border-gray-200 hover:text-blue-500 hover:bg-white flex text-center place-content-evenly'>
                                        Apply Now <FaArrowRight/>
                                    </button>


                                </div>
                                <div className='flex space-x-4'>
                                    <div className='bg-white shadow-md rounded-lg p-4 mt-10 space-y-2 dark:bg-black dark:text-white'>
                                        <p>Salary (USD)</p>
                                        <p className='text-green-300 text-xl'>
                                            {info.salary ? info.salary : "No stimulated Salary"}</p>
                                        <p className='text-sm font-light'>Yearly Salary</p>

                                    </div>
                                    <div className='bg-white shadow-md rounded-lg p-4 mt-10 space-y-2 dark:bg-black dark:text-white'>
                                        <LuBookOpen className='text-2xl'/>
                                        <p className='text-green-300 text-xl'>
                                            Job Location</p>
                                        <p className='text-xs font-light'>{info['candidate_required_location']}</p>

                                    </div>
                                </div>
                                <div className='bg-white shadow-md rounded-lg p-4 mt-10 space-y-4 dark:bg-black dark:text-white'>
                                    <h5 className='text-xl font-normal'>Job Tags</h5>
                                    <div className='grid grid-cols-3 gap-3'>
                                        
                                        {info.tags.map((item) =>{
                                            return(
                                                <div key={item} className='flex flex-col space-y-3'>
                                                    <GrLanguage/>
                                                    <div>
                                                        {item}
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <div className='bg-white shadow-md rounded-lg p-4 mt-10 space-y-4 dark:bg-black dark:text-white'>
                                    <h5 className='text-lg'>Job Overview</h5>
                                    <div>
                                        <div className='space-y-3'>
                                            <FaRegCopy/>
                                            <p className='text-sm'>JOB POSTED</p>
                                            <p>{info['publication_date']}</p>


                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )


                })}
            </div>

        
        </main>
    </GlobalStateProvider>
  )
}

export default Page
