import React from 'react'

const NoRecord = () => {
     return (
          <div class="flex items-center justify-center h-80vh w-full my-10">
               <div class="bg-gray-200 p-8 rounded-md text-center">
                    <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                         <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    <h3 class="text-2xl font-bold mb-4">No Records Found</h3>
                    <p class="text-gray-600">There are no records available at the moment.</p>
               </div>
          </div>

     )
}

export default NoRecord