import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import API from "../api-helpers/API";
import { useRouter } from "next/router";
import Form from './component/KabanBoardForm'
import Modal from "./component/Model";

const KabanBoard = ({ kabanBoard }) => {
  // const [form, setForm] = useState(false)
  const [kabanBoardData, setKabanBoard] = useState(kabanBoard)
  const [form, setForm] = useState({ task: "", open: false })
  const [validationError, setValidationError] = useState(null);
  const [isModalOpen, setModalOpen] = useState({ message: "", open: false });

  const routeTo = (res) => {
    router.push({
      pathname: `/kabanCard/${res._id}`,
      query: res,
    });
  }

  const editKabanBoard = (res) => {
    setFormData(res);
    setForm({ task: "update", open: true });
  }

  const deleteKabanBoard = async (res) => {
    try {
      const response = await API.delete('/kaban?id=' + res._id);

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

  const onSubmitForm = async (res) => {

    if (res.name == '' || res.description == '') {
      setValidationError('Please fill in all fields.');
      return;
    }

    try {
      if (form.task == "create") {
        const response = await API.post('/kaban', res);
        if (response.status === 201) {
          setModalOpen({ message: "Item created Successfully", open: true });
          setValidationError(null);
          setFormData({ name: "", description: "" })
        } else {
          setValidationError('Error creating item. Please try again.');
        }
      } else {
        const response = await API.put('/kaban?id=' + res._id, res);
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

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const closeModal = () => {
    setModalOpen({ message: "", open: false });
  };

  const closePopUp = () => {
    setForm({ ...form, open: false });
    setFormData({
      name: "",
      description: "",
      kabanBoardId: "",
      dueDate: "",
      taskStatus: ""
    })
  }

  const fetchData = async () => {
    const response = await API.get("/kaban");
    const { Kaban } = response.data;
    setKabanBoard(Kaban)
  }

  useEffect(() => {
    fetchData();
  }, [form, isModalOpen])

  const router = useRouter();
  return (
    <Layout>
      <div className="px-12 py-8 bg-dark">
        <h1 className="font-bold text-gray-600 text-xl mb-2 text-center">Kaban Board</h1>

        <div className="flex justify-end items-center">
          <button onClick={() => setForm({ task: "create", open: true })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Kaban</button>
        </div>

        {validationError && <h1 className="text-red-500 text-center text-xl">{validationError}</h1>}
        <div className="grid grid-cols-3 gap-4">
          {kabanBoardData?.map(res =>
            <div className="shadow-md p-4" key={res._id}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => routeTo(res)}>{res.name}</h3>

                <div className="flex items-center justify-end">
                  <button onClick={() => editKabanBoard(res)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <i className="fas fa-edit"></i> {/* Update/Edit icon */}
                  </button>

                  <button onClick={() => deleteKabanBoard(res)} className="text-red-500 hover:text-red-700 focus:outline-none ml-5">
                    <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                  </button>
                </div>
              </div>

              <hr className="bg-dark my-3" />
              <p>{res.description}</p>
            </div>
          )}

        </div>
      </div>

      <Form initialData={formData} isOpen={form.open} onClose={() => closePopUp()} onSubmit={(res) => onSubmitForm(res)} />

      <Modal isOpen={isModalOpen.open} onClose={closeModal}>
        <h1>{isModalOpen.message}</h1>
      </Modal>
    </Layout>
  );
};


export async function getServerSideProps() {
  const response = await API.get("/kaban");
  const { Kaban } = await response.data;

  return {
    props: {
      kabanBoard: Kaban,
    },
  };
}

export default KabanBoard;
