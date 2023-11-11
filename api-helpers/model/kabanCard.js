import mongoose from "mongoose";

let Schema = mongoose.Schema;
const kabanCardSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     kabanBoardId: {
          type: String,
          required: true,
     },
     dueDate: {
          type: Date,
     },
     taskStatus: {
          type: String,
          enum: ['todo', 'inprogress', 'completed'],
          required: true,
     }
});

let Kaban;

try {
     Kaban = mongoose.model("KabanCard");
} catch (error) {
     Kaban = mongoose.model("KabanCard", kabanCardSchema);
}

export default Kaban;
