"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { CiMedicalClipboard } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';


function Jobs({id, title, handleClickAction, salary, name, jobType, location, logo}) {
    const [saved, setSaved] = useState([])
    const storedData = localStorage.getItem("jobs")

    useEffect(()=>{
        
        if(storedData){
            setSaved(JSON.parse(storedData))
        }
    }, [storedData])

    const onSave = async function () {
        try {
          const res = await fetch(`/api/jobs/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
      
          if (!res.ok) throw new Error("Failed to fetch data");
      
          const newItem = await res.json();
      
          if (!newItem || newItem.length === 0) {
            console.error("No data returned from API");
            return;
          }
      
          const item = { name: newItem[0]["company_name"], title: newItem[0].title };
      
          // Use functional state update to ensure correct state handling
          setSaved((prevSaved) => {
            const updatedData = [...prevSaved, item];
            localStorage.setItem("jobs", JSON.stringify(updatedData)); // Update localStorage inside state update
            return updatedData;
          });
      
          
        } catch (error) {
          console.error("Error saving job:", error);
        }

        
      };
      
  return (
        <div
            key={id} 
            className=' mt-3 shadow-2xl shadow-white bg-yellow-50 p-8 dark:bg-gray-800 
            dark:shadow-black dark:text-white text-black'>
                <div>
                    <div className='flex place-content-between'>
                        <div
                        onClick={handleClickAction} 
                        >
                            <p className='text-lg font-bold'>{title}</p>
                            <p className='text-green-300 text-sm font-light'>{jobType}</p>
                            <p>
                                { salary && `Salary: ${salary}`}
                            </p>
                        </div>
                        <div className='text-blue'>
                            <Link href={'/apply'} className='text-blue-400 text-lg'>Apply</Link>

                        </div>
                    </div>
                    <div className='flex space-x-1 place-content-between p-3'>
                        
                        <div
                        onClick={handleClickAction}  
                        className='flex space-x-3 mt-5'>
                            <Image src={logo} alt='company logo' height={40} width={40}/>
                            <div>
                                <p className='text-lg font-semibold'>{name}</p>
                                <div className='flex space-x-3 mt-2'>
                                    <IoLocationOutline className='cursor-pointer'/>
                                    <p className='text-sm font-light text-gray-500'>
                                        {location}
                                    </p>
                                </div>

                            </div>
                            
                        </div>
                        <div>
                            
                            <CiMedicalClipboard className='cursor-pointer' onClick={()=>{onSave()}}/>


                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>

            </div>

  )

}

export default Jobs
