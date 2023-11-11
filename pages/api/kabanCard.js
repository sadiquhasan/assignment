import { connectDB } from "../../api-helpers/utils";
import {
     addKabanCard, getAllKabanCard, updateKabanCard, deleteKabanCard
} from "@/api-helpers/controllers/kabanCard-controller";

export default async function handler(req, res) {
     await connectDB();

     if (req.method == "GET") getAllKabanCard(req, res);
     else if (req.method == "POST") return addKabanCard(req, res);
     else if (req.method == "PUT") return updateKabanCard(req, res);
     else if (req.method == "DELETE") return deleteKabanCard(req, res);
}
