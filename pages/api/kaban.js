import { connectDB } from "../../api-helpers/utils";
import {
     addKabanBoard, getAllKabanBoard, updateKabanBoard, deleteKabanBoard
} from "@/api-helpers/controllers/kabanBoard-controller";

export default async function handler(req, res) {
     await connectDB();

     if (req.method == "GET") getAllKabanBoard(req, res);
     else if (req.method == "POST") return addKabanBoard(req, res);
     else if (req.method == "PUT") return updateKabanBoard(req, res);
     else if (req.method == "DELETE") return deleteKabanBoard(req, res);
}
