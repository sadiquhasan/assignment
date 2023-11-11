import mongoose from "mongoose";

let Schema = mongoose.Schema;
const kabanBoardSchema = new Schema({
     name: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
});

let Kaban;

try {
     Kaban = mongoose.model("Kaban");
} catch (error) {
     Kaban = mongoose.model("Kaban", kabanBoardSchema);
}

export default Kaban;
