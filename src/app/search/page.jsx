"use client"
import React from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { IoLocationOutline } from "react-icons/io5";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GlobalStateProvider } from '../context';
import Image from 'next/image';
import Jobs from '../components/Jobs';
import Button from '../components/Button';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';


function Search() {
    
    const [searchedJobs, setSearchJobs] = useState([])
    const searchParams = useSearchParams()
    const query = searchParams.get('search')
    const page = searchParams.get('page')
    const [searchJobTitle, setSearchJobTitle] = useState("")
    const [searchJobLocation, setSearchJobLocation] = useState("")
    const [jobPage, setJobPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const router = useRouter()

    let currentPage = Number(page) || 1

    

    const getSearchData = async function(page = 1, search="") {
        const response = await fetch(`/api/search`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "search": search })
        });


        const result = await response.json()

        return result
        

        
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()


        const name = searchJobTitle.trim()
        const location = searchJobLocation.trim()
        const fullJobSearch = `${name} ${location}`


        if (name){
            const{dataSearch, totalPages} = await getSearchData(currentPage, fullJobSearch)
           
            setJobPage(totalPages)
            // console.log(data)

            setMaxPage(Math.ceil(dataSearch ? dataSearch.length : 10/10))

            currentPage = currentPage >= maxPage ? currentPage : 1 

            dataSearch && setSearchJobs(dataSearch.slice(Math.ceil((currentPage-1) * 10), Math.ceil(currentPage* 10)))
            
            
        }
        // else{
        //     data && setSearchJobs(data['jobs'][10])

        // }
        
    }

    const reteriveJobInfo = (job, id) =>{
        const encodedJob = encodeURIComponent(JSON.stringify(job["company_name"]))

        router.push(`/search/${id}?data=${encodedJob}`)

    }


    useEffect(() => {
        if (query) {
            const getData = async () => {
                const { data, totalPages } = await getSearchData(currentPage, query);
                setJobPage(totalPages);
                

                setMaxPage(Math.ceil(data ? data.length : 10/10))

                // setCurrentPage(currentPage >= maxPage ? currentPage : 1) 
                currentPage = currentPage >= maxPage ? currentPage : 1 

                data && setSearchJobs(data.slice(Math.ceil((currentPage-1) * 10), Math.ceil(currentPage* 10)))

                // console.log(dataSearch)
            };
            getData();

            

        }
        else if(!searchedJobs || searchedJobs == [] || query === ""){
            const fetchAllData = async () => {
                const res = await fetch('/api/jobs');
                const data = await res.json();
                setSearchJobs(data.slice(0, 10));
            };
            fetchAllData();
            
            
        } 
        else {
            const fetchAllData = async () => {
                const res = await fetch('/api/jobs');
                const data = await res.json();

                setMaxPage(Math.ceil(data ? data.length : 10/10))

                // setCurrentPage(currentPage >= maxPage ? currentPage : 1) 

                currentPage = currentPage >= maxPage ? currentPage : 1 

                data && setSearchJobs(data.slice(Math.ceil((currentPage-1) * 10), Math.ceil(currentPage* 10)))
            };
            fetchAllData();
            
        }
        
    }, [query, currentPage]); 
    
    
  return (
    
        <GlobalStateProvider>
            <main className='dark:bg-black text-black dark:text-white bg-white h-[200vh]'>
                <Navbar/>
                <div className='flex place-content-between bg-gray-200 p-5 dark:bg-gray-700 dark:text-white'>
                    <Link href={'/search'}>Find Job</Link>

                    <div className='flex space-x-3'>
                        <Link href={'/'}>Home</Link>
                        <p>/</p>
                        <Link href={'/'}>Saved Jobs</Link>

                    </div>
                    
                </div>
                <div className='bg-gray-100 p-5 flex place-content-center dark:bg-gray-900 dark:text-white'>
                    <form action="" 
                    onSubmit={(e) => {handleSubmit(e)}}
                    className='bg-white w-fit p-2 flex shadow-2xl shadow-white brightness-100 
                    dark:bg-black dark:shadow-md dark:shadow-black'>
                        <input type="text" 
                            className=' focus:border-o focus:border-white transition-all bg-white dark:bg-black
                            h-10 w-[30rem] rounded-sm border-0 border-gray-200 p-2 border-r-0 max-md:w-[10rem]' 
                            placeholder='Job Title, Keyword....'
                            value={searchJobTitle}
                            onChange={(e)=>{setSearchJobTitle(e.target.value)}}
                        />
                        <div className='flex space-x-2 max-sm:hidden'>
                            <IoLocationOutline className='text-xl mt-2'/>
                            <input type="text" 
                                className=' focus:border-o focus:border-white transition-all bg-white dark:bg-black
                                h-10 w-[20rem] rounded-sm border-0 border-gray-200 p-2 max-md:w-[7rem]' 
                                placeholder='Your Location'
                                value={searchJobLocation}
                                onChange={(e)=>{setSearchJobLocation(e.target.value)}}
                            />

                        </div>
                        <button 
                        type='submit'
                        className='cursor-pointer p-2 h-10 text-white transition-all duration-500
                        bg-blue-400 w-24 rounded-lg border-2 border-gray-200 hover:text-blue-500 hover:bg-white'>
                            Find Jobs
                        </button>


                    </form>
                </div>
                <div>
                    <div className='bg-white grid grid-cols-2 gap-4 p-10 max-md:grid-cols-1 dark:bg-black min-h-full'>
                        {Array.isArray(searchedJobs) && searchedJobs.length > 0 ? searchedJobs.map((job) =>{
                            return(
                                <div 
                                    className='cursor-pointer'
                                    href={`/search/${job.id}`}
                                    key={job.id}
                                    
                                
                                >
                                    <Jobs
                                
                                        key={job.id}
                                        handleClickAction = {()=>{reteriveJobInfo(job, job.id)}} 
                                        id = {job.id} 
                                        title={job.title} 
                                        name={job['company_name']}
                                        salary= {job.salary} 
                                        jobType={job['job_type']} 
                                        location ={job["candidate_required_location"]} 
                                        logo = {job["company_logo"]}
                                    />

                                </div>
        
                            )
                            
                        }): <p className='text-xl text-black text-center dark:text-white'>{"No job matched your search result"}</p>}
                    </div>
                </div>

                <div className='flex mt-10 place-content-center'>
                    <Button currentPage = {currentPage} totalPages={jobPage}/>

                </div>
            
            </main>
        </GlobalStateProvider>
    
  )
}

export default function SearchPage(){
    return(
        <Suspense fallback={<p>Loading...</p>}>
            <Search/>
        </Suspense>
    )
};
