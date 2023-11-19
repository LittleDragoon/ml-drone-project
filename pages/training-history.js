import NavBar from "@/components/Navbar";
import React from "react";
import { FaTrash } from "react-icons/fa";
import clsx from "clsx";
import { DB_COLLECTION } from "@/api/trainingData";
import { db } from "../firebase/index";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function TrainingHistory() {
  const status = "completed";
  const title = "Training 1";
  const description = "Description 1";
  const formattedDeadlineDate = "25-10-2022";

  const { user, isUserSignedIn } = useAuth();

  const [trainingList, setTrainingList] = React.useState([]);
  const getAllDocs = () => {
    if (!isUserSignedIn) {
      setTrainingList([]);
      return;
    }

    const orderedQuery = query(
      collection(db, DB_COLLECTION),
      where("user", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    // onSnapshot always listen to changes in firebase and the callback functon gets executed
    const unsubscribe = onSnapshot(orderedQuery, (querySnapchot) => {
      let userTemporaryTodoList = [];
      querySnapchot.docs.forEach((doc) => {
        //doc has a "hidden" id props which is the automatic generated id of the document
        userTemporaryTodoList.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTrainingList(userTemporaryTodoList);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  };

  React.useEffect(getAllDocs, [user?.uid, isUserSignedIn]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center font-semibold text-4xl font-bold text-gray-200 pb-8">
        Training History
      </div>
      <div className="flex justify-center">
        <div className="border-r border-b border-l border-gray-400 bg-white rounded-b p-4 w-4/5 ">
          <div className="flex items-center gap-x-2">
            <div className="flex-1 text-gray-900 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </div>
            <div
              className={clsx(
                "uppercase text-xs font-bold rounded-sm p-1",
                `${status === "pending" ? "bg-orange-300" : "bg-green-300"}`
              )}
            >
              {status}
            </div>
            <button
              onClick={() => {
                alert("incoming delete working");
              }}
            >
              <FaTrash />
            </button>
          </div>
          <div className="flex gap-x-2 rounded-lg border bg-gray-200 w-fit px-1 text-sm">
            <div>{formattedDeadlineDate}</div>
          </div>
          <p className="text-gray-700 text-base text-justify mt-4">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
