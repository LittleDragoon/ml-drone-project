import {
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";

const COLLECTION_NAME = "trainingList";
// Add a new document with a automatic generated "id".
export const addTrainingSetup = async ({
  userId,
  title,
  description,
  status,
}) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      user: userId,
      title: title,
      description: description,
      status: status,
      //to order firebase documents
      createdAt: new Date().getTime(),
    });
    toast.success(`Training Successful`, {
      containerId: "Training Card",
    });
  } catch (error) {
    toast.error(`Training failed`, {
      containerId: "Training Card",
    });
    throw new Error(`Error in adding. Here is the reason : ${error}`);
  }
};
