import {
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";

export const DB_COLLECTION = "trainingList";
