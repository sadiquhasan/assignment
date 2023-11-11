import React, { useEffect, useState } from 'react';

const Modal = ({ initialData, isOpen, onClose, onSubmit }) => {
     const [formData, setFormData] = useState({
          name: '',
          description: '',
     });



     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          onSubmit(formData);
          onClose();
     };

     useEffect(() => {
          setFormData(initialData)
     }, [initialData])


     return (
          <div
               className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'
                    }`}
          >
               <div className="fixed inset-0 bg-black opacity-50"></div>

               <div className="bg-white p-6 rounded-md shadow-md w-96 z-50">
                    <div className="flex justify-end">
                         <button
                              onClick={onClose}
                              className="text-gray-500 hover:text-gray-700 focus:outline-none text-4xl w-8 h-8"
                         >
                              &times;
                         </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-4">
                         <label className="block mb-2 text-sm font-bold">Name</label>
                         <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                         />

                         <label className="block mb-2 text-sm font-bold">Description</label>
                         <textarea
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                         />

                         <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                         >
                              Submit
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default Modal;
