import React from 'react';

const Model = ({ isOpen, onClose, children }) => {
     if (!isOpen) {
          return null;
     }

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
               <div className="fixed inset-0 bg-black opacity-50"></div>

               <div className="bg-white p-6 rounded-md shadow-md z-50">
                    <div className="flex justify-end">
                         <button
                              onClick={onClose}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none text-4xl w-8 h-8"
                         >
                              &times;
                         </button>
                    </div>

                    <div className="mt-4 text-white-900 text-xl mx-5 my-5 font-bold">{children}</div>
               </div>
          </div>
     );
};

export default Model;
