import KabanCard from "../model/kabanCard";

export const addKabanCard = async (req, res) => {
     const { name, description, kabanBoardId, dueDate, taskStatus } = req.body;

     if (
          !name &&
          name.trim() === "" &&
          !description &&
          description.trim() === "",
          !kabanBoardId &&
          kabanBoardId.trim() === "",
          !dueDate &&
          dueDate.trim() === "",
          !taskStatus &&
          taskStatus.trim() === ""
     ) {
          return res.status(422).json({ messsage: "Invalid Inputs" });
     }

     let kabanCard;

     try {
          kabanCard = new KabanCard({ name, description, kabanBoardId, dueDate, taskStatus });
          kabanCard = await kabanCard.save();
     } catch (err) {
          return console.log("err ", err);
     }

     if (!kabanCard) {
          return res.status(500).json({ messge: "Internal Server Error" });
     }

     return res.status(201).json({ kabanCard, status: 200 });
};

export const getAllKabanCard = async (req, res) => {
     const kabanBoardId = req.query.id;
     let kabanCard;

     try {
          kabanCard = await KabanCard.find({ kabanBoardId });
     } catch (err) {
          return console.log("err ", err);
     }

     if (!kabanCard) {
          return res.status(500).json({ message: "Internal Server Error" });
     }

     if (kabanCard.length == 0) {
          return res.status(404).json({ message: "No kabanCard Found" });
     }

     return res.status(201).json({ kabanCard, status: 200 });
};


export const updateKabanCard = async (req, res) => {
     const id = req.query.id;
     const { name, description } = req.body;
     if (
          !name &&
          name.trim() === "" &&
          !description &&
          description.trim() === ""
     ) {
          return res.status(422).json({ messsage: "Invalid Inputs" });
     }

     let kabanCard;

     try {
          kabanCard = await KabanCard.findByIdAndUpdate(id, { name, description });
     } catch (err) {
          return new Error(err);
     }

     if (!kabanCard) {
          return res.status(500).json({ message: "Internal Server Error" });
     }

     return res.status(200).json({ message: "Successfully Updated", status: 200 });
};

export const deleteKabanCard = async (req, res) => {
     const id = req.query.id;
     let kabanCard;

     try {
          kabanCard = await KabanCard.findByIdAndDelete(id);
     } catch (err) {
          return new Error(err);
     }

     if (!kabanCard) {
          return res.status(500).json({ message: "Internal Server Error" });
     }

     return res.status(200).json({ message: "Successfully Deleted", status: 200 });
};
