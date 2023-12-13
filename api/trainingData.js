import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";
import axios from "axios";

export const DB_COLLECTION = "trainingList";

// In the future when the server is ON. IT WORKS !
export const addTrainingRequest = async (requestParams) => {
  try {
    // const response = await axios.post("http://localhost:5000/train", {
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

export const shutdownTrainingRequest = async (requestParams) => {
  try {
    // const response = await axios.post("http://localhost:5000/shutdown", {
    //   requestParams,
    // });

    toast.success(`Training shutdown successful`, {
      containerId: "Training Card",
    });
  } catch (error) {
    toast.error(`Training shutdown failed`, {
      containerId: "Training Card",
    });
    throw new Error(`Error in shutdown. Here is the reason : ${error}`);
  }
};

// Delete a document with an id.
export const deleteTrainingRequest = async ({ uid, mid }) => {
  try {
    const documentToDeleteRef = doc(db, "users", uid, "models", mid);
    await deleteDoc(documentToDeleteRef);
  } catch (err) {
    throw new Error("Error in deleting cards");
  }
};
