import NavBar from "@/components/Navbar";
import React from "react";
import { db } from "../firebase/index";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import TrainingCard from "@/components/card/TrainingCard";
import { AuthUserContext } from "@/context/AuthUserContext";
import { useContext } from "react";

export default function TrainingHistory() {
  const { user, isUserSignedIn } = useContext(AuthUserContext);

  const [trainingList, setTrainingList] = React.useState([]);
  const getAllDocs = () => {
    if (!isUserSignedIn) {
      setTrainingList([]);
      return;
    }

    const orderedQuery = query(
      collection(db, "users", user.uid, "models"),
      orderBy("timestamp", "desc")
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
      <div className="flex flex-col items-center gap-y-4">
        {trainingList.length !== 0 &&
          trainingList.map((training) => (
            <TrainingCard {...training} key={training.mid} />
          ))}
      </div>
    </>
  );
}
