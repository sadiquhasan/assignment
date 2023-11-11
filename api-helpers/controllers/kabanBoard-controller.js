import KabanBoard from "../model/kabanBoard";

export const addKabanBoard = async (req, res) => {
     const { name, description } = req.body;
     if (
          !name &&
          name.trim() === "" &&
          !description &&
          description.trim() === ""
     ) {
          return res.status(422).json({ messsage: "Invalid Inputs" });
     }

     let kabanBoard;

     try {
          kabanBoard = new KabanBoard({ name, description });
          kabanBoard = await kabanBoard.save();
     } catch (err) {
          return console.log("err ", err);
     }

     if (!kabanBoard) {
          return res.status(500).json({ messge: "Internal Server Error" });
     }

     return res.status(201).json({ kabanBoard });
};

export const getAllKabanBoard = async (req, res) => {
     let Kaban;

     try {
          Kaban = await KabanBoard.find();
     } catch (err) {
          return console.log("err ", err);
     }

     if (!Kaban) {
          return res.status(500).json({ message: "Internal Server Error" });
     }

     if (Kaban.length == 0) {
          return res.status(404).json({ message: "No kabanBoard Found" });
     }

     return res.status(201).json({ Kaban });
};


export const updateKabanBoard = async (req, res) => {
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

     let kabanBoard;

     try {
          kabanBoard = await KabanBoard.findByIdAndUpdate(id, { name, description });
     } catch (err) {
          return new Error(err);
     }

     if (!kabanBoard) {
          return res.status(500).json({ message: "Internal Server Error" });
     }

     return res.status(200).json({ message: "Successfully Updated" });
};

export const deleteKabanBoard = async (req, res) => {
     const id = req.query.id;
     let kabanBoard;

     try {
          kabanBoard = await KabanBoard.findByIdAndDelete(id);
     } catch (err) {
          return new Error(err);
     }

     if (!kabanBoard) {
          return res.status(500).json({ message: "Internal Server Error" });
     }

     return res.status(200).json({ message: "Successfully Deleted" });
};
