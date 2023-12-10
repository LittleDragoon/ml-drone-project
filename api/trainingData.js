import {
  doc,
  deleteDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";
import axios from "axios";

export const DB_COLLECTION = "trainingList";

// In the future when the server is ON. IT WORKS !
export const addTrainingRequest = async (requestParams) => {
  try {
    // const response = await axios.post("http://localhost:5000/", {
    //   ...requestParams,
    //   timestamp: new Date().getTime(),
    // });

    toast.success(`Training running`, {
      containerId: "Training Card",
    });
  } catch (error) {
    toast.error(`Training failed`, {
      containerId: "Training Card",
    });
    throw new Error(`Error in adding. Here is the reason : ${error}`);
  }
};
