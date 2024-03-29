import NavBar from "@/components/Navbar";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthUserContext } from "@/context/AuthUserContext";
import { useContext } from "react";
import clsx from "clsx";
import { Tooltip } from "@nextui-org/react";
import { addTrainingRequest } from "@/api/trainingData";

export default function TrainingSetup() {
  const { user } = useContext(AuthUserContext);

  const [requestParams, setRequestParams] = React.useState({
    title: "",
    // Not higher than 4
    nb_cores: 2,
    epochs: "",
    env_id: "DroneHoverBulletEnv-v0",
    alg: "PPO",
    uid: user?.uid,
    mid: uuidv4(),
    timestamp: null,
  });

  const constParamsList = {
    drone: {
      id: "drone-id",
      values: ["Crazyflie 2.1", "Crazyflie 2.0"],
    },
    repositoryGIT: {
      id: "repositoryGIT-id",
      values: ["Phoenix", "GymPybullet"],
    },
    controlAlgorithm: {
      id: "controlAlgorithm-id",
      values: ["Reinforcement Learning", "PID"],
    },
    processorType: {
      id: "processorType-id",
      values: ["Multi-CPU", "CPU", "GPU"],
    },
  };

  const varParamsList = {
    cores: {
      id: "cores-id",
      values: [2, 4],
    },
    env_id: {
      id: "env_id-id",
      values: ["DroneHoverBulletEnv-v0", "DroneTakeOffBulletEnv-v0"],
    },
    alg: {
      id: "alg-id",
      values: ["PPO", "TRPO"],
    },
  };

  const constParamsListCategories = Object.keys(constParamsList);
  const varParamsListCategories = Object.keys(varParamsList);

  const keyToName = {
    env_id: "Environment",
    alg: "Algorithm",
    cores: "Cores",
  };

  const changeTitle = (e) => {
    setRequestParams((request) => {
      return { ...request, title: e.target.value };
    });
  };

  const changeEpochs = (event) => {
    let enteredValue = parseInt(event.target.value, 10);

    // Check if the entered value is within the specified range
    if (enteredValue <= 0 || isNaN(enteredValue)) {
      setRequestParams((request) => {
        return { ...request, epochs: "" };
      });
    }
    if (0 < enteredValue && enteredValue <= 500) {
      // Update the state with the valid entered value
      setRequestParams((request) => {
        return { ...request, epochs: enteredValue };
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center gap-x-6 ">
        {/* Section Constants */}
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-2xl font-semibold text-green-600">
            Constants :
          </div>
          {constParamsListCategories.map((category) => {
            return (
              <select
                className="rounded-lg text-green-400 border border-gray-400 px-2 py-2 bg-transparent text-center"
                readOnly
                name={category}
                id={constParamsList[category].id}
                value={constParamsList[category].values[0]}
                key={constParamsList[category].id}
              >
                {constParamsList[category]?.values.map((value, index) => {
                  return (
                    <option value={value} key={index} disabled={index !== 0}>
                      {value}
                    </option>
                  );
                })}
              </select>
            );
          })}
        </div>

        {/* Section Variables  */}
        <div className="flex flex-col w-2/5 gap-y-3 items-center mt-12 mb-8 border border-2 border-slate-500 p-4">
          <div className="text-2xl font-semibold text-gray-200">Variables</div>

          <div className="flex flex-col w-full gap-y-2">
            <div className="text-white text-md font-semibold">Title</div>
            <input
              className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
              value={requestParams.title}
              type="text"
              id="title-id"
              name="title-name"
              placeholder="Enter a title"
              onChange={changeTitle}
            />
          </div>

          {/* Epochs */}
          <div className="flex flex-col w-full gap-y-2">
            <div className="text-white text-md font-semibold">Epochs</div>
            <input
              className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
              type="number"
              id="epochs-id"
              name="epochs-name"
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              placeholder="Enter the number of epochs between 1 and 500"
              value={requestParams.epochs}
              onChange={changeEpochs}
              min="1"
              max="500"
            />
          </div>
          {varParamsListCategories.map((category) => {
            return (
              <div
                className="flex flex-col w-full gap-y-2"
                key={varParamsList[category].id}
              >
                <div className="text-white text-md font-semibold">
                  {keyToName[category]}
                </div>
                <select
                  className="w-full rounded-sm text-white border border-gray-400 px-2 py-2 bg-transparent"
                  name={category}
                  id={varParamsList[category].id}
                  value={varParamsList[category].values[0]}
                  onChange={() => {}}
                >
                  {varParamsList[category]?.values.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
          <Tooltip
            key="danger"
            placement="right"
            content="Fill all the fields to run the training"
            showArrow
            classNames={{
              content: [
                "py-2 px-4 shadow-xl",
                "bg-gradient-to-br from-gray-300 to-neutral-400",
              ],
            }}
            isDisabled={
              !(requestParams.title === "" || requestParams.epochs === "")
            }
          >
            <button
              className={clsx(
                "self-end text-white font-medium rounded-lg text-md px-5 py-2 mt-2 text-center ",
                `${
                  requestParams.title === "" || requestParams.epochs === ""
                    ? "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-300 to-red-600"
                    : "bg-gradient-to-br from-green-700 via-green-600 to-green-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 "
                }`
              )}
              onClick={() => addTrainingRequest(requestParams)}
              disabled={
                requestParams.title === "" || requestParams.epochs === ""
              }
            >
              Run Training
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
