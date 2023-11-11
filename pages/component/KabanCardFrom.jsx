import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Modal = ({ initialData, isOpen, onClose, onSubmit }) => {
     const [formData, setFormData] = useState({
          name: "",
          description: "",
          kabanBoardId: initialData.kabanBoardId ?? "",
          dueDate: "",
          taskStatus: "todo"
     });

     const handleChange = (e) => {
          console.log(formData)
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


                         <label htmlFor="select" class="block text-sm font-medium text-gray-700">Select Option:</label>
                         <select defaultValue={formData.taskStatus} onChange={handleChange} name="taskStatus" class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
                              <option className="text-red-600" value="todo">Todo</option>
                              <option className="text-yellow-600" value="inprogress">In Progress</option>
                              <option className="text-green-600" value="completed">Completed</option>
                         </select>

                         <label htmlFor="datepicker" class="block text-sm font-medium text-gray-700">Select Date:</label>
                         <input name="dueDate" value={moment(formData.dueDate).format("dd-mm-yyyy")} onChange={handleChange} type="date" class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" />
                         {/* <input value="2023-12-12" onChange={handleChange} type="date" class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" /> */}


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
