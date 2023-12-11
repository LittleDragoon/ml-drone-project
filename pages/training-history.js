import NavBar from "@/components/Navbar";
import React from "react";
import { db } from "../firebase/index";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import TrainingCard from "@/components/card/TrainingCard";
import { AuthUserContext } from "@/context/AuthUserContext";
import { useContext } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { TbSearch } from "react-icons/tb";
import { IoFilter } from "react-icons/io5";

const filterTrainingList = (filterTitle, filterValues, trainingList) => {
  if (trainingList.length === 0) return [];

  if (filterTitle.length !== 0 && filterValues.length !== 0) {
    return trainingList.filter(
      (training) =>
        filterValues &&
        filterValues.includes(training.status) &&
        training.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
  } else if (filterTitle.length !== 0 && filterValues.length === 0) {
    return trainingList.filter(
      (training) =>
        training.title &&
        training.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
  } else if (filterTitle.length === 0 && filterValues.length !== 0) {
    return trainingList.filter(
      (training) => training.status && filterValues.includes(training.status)
    );
  } else {
    return trainingList;
  }
};

export default function TrainingHistory() {
  const { user, isUserSignedIn } = useContext(AuthUserContext);
  const [trainingList, setTrainingList] = React.useState([]);
  const [filterValues, filterSetValues] = React.useState([]);
  const [filterTitle, setFilterTitle] = React.useState("");

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

  const statusToSVGColor = {
    completed: "rgb(134 239 172)",
    running: "rgb(74 222 128)",
    error: "rgb(239 68 68)",
    queued: "rgb(167 139 250)",
    shutdown: "rgb(239 68 68)",
  };
  const statusArray = [
    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "Running",
      value: "running",
    },
    {
      label: "Queued",
      value: "queued",
    },
    {
      label: "Shutdown",
      value: "shutdown",
    },
    {
      label: "Error",
      value: "error",
    },
  ];

  const filteredTrainingList = filterTrainingList(
    filterTitle,
    filterValues,
    trainingList
  );
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="flex pb-8 w-3/5 gap-x-4">
          <Input
            type="title"
            label="Search by title"
            placeholder="Enter your title"
            isClearable
            startContent={<TbSearch size={20} />}
            value={filterTitle}
            onValueChange={(value) => setFilterTitle(value)}
          />
          <Select
            label="Filter by status"
            placeholder="Select a status"
            size="md"
            className="max-w-xs"
            selectionMode="multiple"
            selectedKeys={filterValues}
            onSelectionChange={(value) => {
              filterSetValues([...value]);
            }}
            startContent={<IoFilter size={20} />}
          >
            {statusArray.map((status) => (
              <SelectItem
                key={status.value}
                value={status.value}
                startContent={
                  <svg height="20" width="30">
                    <circle
                      cx="15"
                      cy="10"
                      r="5"
                      fill={statusToSVGColor[status.value]}
                    />
                  </svg>
                }
              >
                {status.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col items-center gap-y-4 w-3/5">
          {filteredTrainingList.length !== 0 &&
            filteredTrainingList.map((training, index) => (
              <TrainingCard
                {...training}
                uid={user?.uid}
                key={training.mid ?? index}
              />
            ))}
        </div>
      </div>
    </>
  );
}
