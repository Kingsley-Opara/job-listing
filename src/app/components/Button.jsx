"use client"
import React from 'react'
import Link from 'next/link'

function Button({currentPage, totalPages}) {
    
  return (
    <>

        <div className="flex space-x-5 dark:bg-black">
            
            {
                
                <Link 
                    href={`/search?page=${currentPage - 1}`} 
                    className="flex items-center justify-center px-4 h-10 
                    text-base font-medium text-gray-500 bg-blue-400 border border-gray-300 
                    rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                    dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                    dark:hover:text-white">
                    Previous
                </Link>
            }

            
            {
                
                <Link 
                    href={`/search?page=${currentPage + 1}`} 
                    className="flex items-center justify-center px-4 h-10 
                    text-base font-medium text-gray-500 bg-blue-400 border border-gray-300 
                    rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                    dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                    dark:hover:text-white">
                    Next
                </Link>
            }
        </div>
    </>

  )
}

export default Button
