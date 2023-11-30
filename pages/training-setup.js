import NavBar from "@/components/Navbar";
import React from "react";
import { addTrainingSetup } from "@/api/trainingData";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export default function TrainingSetup() {
  const [requestParams, setRequestParams] = React.useState({
    drone: "Crazyflie 2.0",
    repositoryGIT: "Phoenix",
    motion: "Hover",
    controlAlgorithm: "Reinforcement Learning",
    processorType: "multi-CPU",
  });
  const { user } = useAuth();

  const paramsList = {
    drone: {
      id: "drone-id",
      values: ["Crazyflie 2.0", "Crazyflie 2.1"],
    },
    repositoryGIT: {
      id: "repositoryGIT-id",
      values: ["Phoenix", "GymPybullet"],
    },
    motion: {
      id: "motion-id",
      values: ["Hover", "TakeOff"],
    },
    controlAlgorithm: {
      id: "controlAlgorithm-id",
      values: ["Reinforcement Learning", "PID"],
    },
    processorType: {
      id: "processorType-id",
      values: ["CPU", "multi-CPU", "GPU"],
    },
  };

  const categories = Object.keys(paramsList);

  const addTraining = async () => {
    await addTrainingSetup({
      userId: user.uid,
      title: "This is a Title",
      description: requestParams.drone,
      status: "completed",
    });
  };

  //In the future when the server is ON. IT WORKS !
  // const addTrainingRequest = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/", {
  //       title: "This is a Title",
  //       uid: user?.uid,
  //       mid: uuidv4(),
  //       timestamp: new Date().getTime(),
  //       // Warning, should not be higher than 4 at the moment
  //       nb_cores: 4,
  //       epochs: 3,
  //       env_id: "DroneHoverBulletEnv-v0",
  //       alg: "ppo",
  //     });

  //     toast.success(`Training Successful`, {
  //       containerId: "Training Card",
  //     });
  //   } catch (error) {
  //     toast.error(`Training failed`, {
  //       containerId: "Training Card",
  //     });
  //     throw new Error(`Error in adding. Here is the reason : ${error}`);
  //   }
  // };

  if (!user) return;
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-semibold text-gray-200">
          Training Setup{" "}
        </div>

        <div className="flex flex-col gap-y-3 w-2/5 items-center mt-12 mb-8 border border-2 border-slate-500 p-4">
          {categories.map((category) => {
            return (
              <select
                className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
                name={category}
                id={paramsList[category].id}
                value={requestParams[category]}
                onChange={(e) => {
                  setRequestParams((requestParams) => ({
                    ...requestParams,
                    [category]: e.target.value,
                  }));
                }}
                key={paramsList[category].id}
              >
                {paramsList[category]?.values.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </select>
            );
          })}
          <button
            className="self-end text-white font-medium rounded-lg text-md px-5 py-2 mt-2 text-center bg-gradient-to-br from-green-700 via-green-600 to-green-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 "
            onClick={addTraining}
          >
            Run Training
          </button>
        </div>
      </div>
    </>
  );
}
