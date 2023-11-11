import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useRouter } from 'next/router';
import API from '../API';
import moment from 'moment';
import NoRecord from '../component/NoRecord';
import Modal from "../component/Model"
import From from '../component/KabanCardFrom'

const filteredDataFun = (kabanCardData) => {
     const todo = kabanCardData.filter(res => res.taskStatus === 'todo')
     const inprogress = kabanCardData.filter(res => res.taskStatus === 'inprogress')
     const completed = kabanCardData.filter(res => res.taskStatus === 'completed')

     return { todo, inprogress, completed }
}

const KabanBoardCard = ({ kabanCardData }) => {
     const router = useRouter();
     const { id, name } = router.query;
     const [kabanCardDataItem, setkabanCardData] = useState(kabanCardData)
     const [validationError, setValidationError] = useState(null);
     const [isModalOpen, setModalOpen] = useState({ message: "", open: false });
     const [formData, setFormData] = useState({
          name: "",
          description: "",
          kabanBoardId: id,
          dueDate: "",
          taskStatus: "todo"
     })
     const [form, setForm] = useState({ task: "", open: false })

     useEffect(() => {
          fetchData;
     }, [form, isModalOpen])


     const editKabanCard = (res) => {
          setFormData(res);
          setForm({ task: "update", open: true });
     }

     const deleteKabanCard = async (res) => {
          try {
               const response = await API.delete('/kabanCard?id=' + res._id);

               if (response.status === 200) {
                    setModalOpen({ message: "Item Deleted Successfully", open: true });
               } else {
                    setValidationError('Error Deleting item. Please try again.');
               }
          } catch (error) {
               console.error('API error:', error);
               setValidationError('Error Deleting item. Please try again.');
          }
     }

     const closeModal = () => {
          setModalOpen({ message: "", open: false });
     };

     const closePopUp = () => {
          setForm({ ...form, open: false });
          setFormData({
               name: "",
               description: "",
               kabanBoardId: id,
               dueDate: "",
               taskStatus: "todo"
          })
     }


     const onSubmitForm = async (res) => {
          console.log(res)
          if (res.kabanBoardId == '' || res.name == '' || res.description == '' || res.taskStatus == "") {
               setValidationError('Please fill in all fields.');
               return;
          }

          try {
               if (form.task == "create") {
                    const response = await API.post('/kabanCard', res);
                    if (response.status === 201) {
                         setModalOpen({ message: "Item created Successfully", open: true });
                         setValidationError(null);
                         setFormData({ name: "", description: "" })
                    } else {
                         setValidationError('Error creating item. Please try again.');
                    }
               } else {
                    const response = await API.put('/kabanCard?id=' + res._id, res);
                    if (response.status === 200) {
                         setModalOpen({ message: "Item updated Successfully", open: true });
                         setValidationError(null);
                         setFormData({ name: "", description: "" })
                    } else {
                         setValidationError('Error creating item. Please try again.');
                    }
               }
          } catch (error) {
               console.error('API error:', error);
               setValidationError('Something went wrong. Please try again.');
          }
     }

     const fetchData = async () => {
          try {
               const response = await API.get(`/kabanCard?id=${id}`);
               const { kabanCard } = await response.data;

               if (kabanCard && kabanCard.length) {
                    setkabanCardData(filteredDataFun(kabanCard));
               } else {
                    throw new Error('No kabanCard Found');
               }
          } catch (error) {
               setkabanCardData([]);
          }
     }

     const setSearchFun = (val) => {
          if (val && val.length) {
               var todo = kabanCardData?.todo?.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
               var inprogress = kabanCardData?.inprogress?.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
               var completed = kabanCardData?.completed?.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
               setkabanCardData({ todo, inprogress, completed });
          } else {
               setkabanCardData(kabanCardData);
          }
     }


     return (
          <Layout>
               <div className="px-12 py-8 bg-dark">
                    <h1 className="font-bold text-gray-600 text-xl mb-2 text-center">Kaban Board - {name}</h1>
                    <div className="flex justify-between items-center">
                         <input
                              onChange={(e) => setSearchFun(e.target.value)}
                              type="text"
                              placeholder="Search task here..."
                              className="shadow w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                         />
                         <button onClick={() => setForm({ task: "create", open: true })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Kaban Task</button>
                    </div>
                    {validationError && <h1 className="text-red-500 text-center text-xl">{validationError}</h1>}
                    <hr className='mt-4' />
                    <div class="flex">
                         <div class="flex-1">
                              <p class="font-bold text-lg my-4 text-center text-red-600">ToDo</p>
                         </div>
                         <div class="flex-1">
                              <p class="font-bold text-lg my-4 text-center text-yellow-600">InProgress</p>
                         </div>
                         <div class="flex-1">
                              <p class="font-bold text-lg my-4 text-center text-green-600">Completed</p>
                         </div>
                    </div>

                    {(kabanCardData && Object.keys(kabanCardData).length !== 0) ?
                         <div className="grid grid-cols-3 gap-4">
                              <div class="col-span-1">
                                   {kabanCardDataItem?.todo?.map((res, index) =>
                                        <div className="shadow-lg p-4" key={index}>
                                             <div className="flex items-center justify-between">
                                                  <h3 className="text-lg font-bold text-gray-500 hover:text-gray-700 cursor-pointer">{res.name}</h3>

                                                  <div className="flex items-center justify-end">
                                                       <button onClick={() => editKabanCard(res)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                            <i className="fas fa-edit"></i> {/* Update/Edit icon */}
                                                       </button>

                                                       <button onClick={() => deleteKabanCard(res)} className="text-red-500 hover:text-red-700 focus:outline-none ml-5">
                                                            <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                                                       </button>
                                                  </div>
                                             </div>
                                             <hr className="bg-dark my-3" />
                                             <p>{res.description}</p>
                                             <hr className="bg-dark my-3" />
                                             <p className='text-gray-400 text-sm font-bold'>Due Date - {moment(res.dueDate).format('DD-MM-YYYY')}</p>
                                        </div>
                                   )}
                              </div>
                              <div class="col-span-1">
                                   {kabanCardDataItem?.inprogress?.map((res, index) =>
                                        <div className="shadow-lg p-4" key={index}>
                                             <div className="flex items-center justify-between">
                                                  <h3 className="text-lg font-bold text-gray-500 hover:text-gray-700 cursor-pointer">{res.name}</h3>

                                                  <div className="flex items-center justify-end">
                                                       <button onClick={() => editKabanCard(res)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                            <i className="fas fa-edit"></i> {/* Update/Edit icon */}
                                                       </button>

                                                       <button onClick={() => deleteKabanCard(res)} className="text-red-500 hover:text-red-700 focus:outline-none ml-5">
                                                            <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                                                       </button>
                                                  </div>
                                             </div>
                                             <hr className="bg-dark my-3" />
                                             <p>{res.description}</p>
                                             <hr className="bg-dark my-3" />
                                             <p className='text-gray-400 text-sm font-bold'>Due Date - {moment(res.dueDate).format('DD-MM-YYYY')}</p>
                                        </div>
                                   )}
                              </div>
                              <div class="col-span-1">
                                   {kabanCardDataItem?.completed?.map((res, index) =>
                                        <div className="shadow-lg p-4" key={index}>
                                             <div className="flex items-center justify-between">
                                                  <h3 className="text-lg font-bold text-gray-500 hover:text-gray-700 cursor-pointer">{res.name}</h3>

                                                  <div className="flex items-center justify-end">
                                                       <button onClick={() => editKabanCard(res)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                            <i className="fas fa-edit"></i> {/* Update/Edit icon */}
                                                       </button>

                                                       <button onClick={() => deleteKabanCard(res)} className="text-red-500 hover:text-red-700 focus:outline-none ml-5">
                                                            <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                                                       </button>
                                                  </div>
                                             </div>
                                             <hr className="bg-dark my-3" />
                                             <p>{res.description}</p>
                                             <hr className="bg-dark my-3" />
                                             <p className='text-gray-400 text-sm font-bold'>Due Date - {moment(res.dueDate).format('DD-MM-YYYY')}</p>
                                        </div>
                                   )}
                              </div>

                         </div>
                         :
                         <NoRecord />
                    }
               </div>

               <From initialData={formData} isOpen={form.open} onClose={() => closePopUp()} onSubmit={(res) => onSubmitForm(res)} />

               <Modal isOpen={isModalOpen.open} onClose={closeModal}>
                    <h1>{isModalOpen.message}</h1>
               </Modal>
          </Layout>
     )
}


export async function getServerSideProps(context) {
     try {
          const id = context.params.id;
          const response = await API.get(`/kabanCard?id=${id}`);
          const { kabanCard } = await response.data;

          if (kabanCard && kabanCard.length) {
               return {
                    props: {
                         kabanCardData: filteredDataFun(kabanCard),
                    },
               };
          } else {
               throw new Error('No kabanCard Found');
          }
     } catch (error) {
          console.error('Error fetching kabanCard:', error);
          return {
               props: {
                    kabanCardData: [],
               },
          };
     }
}


export default KabanBoardCard