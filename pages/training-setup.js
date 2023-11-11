import NavBar from "@/components/Navbar";
import React from "react";
import Link from "next/link";

export default function TrainingSetup() {
  const [requestParams, setRequestParams] = React.useState({
    drone: "Crazyflie 2.0",
    repositoryGIT: "Phoenix",
    motion: "Hover",
    controlAlgorithm: "Reinforcement Learning",
    processorType: "multi-CPU",
  });

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

  return (
    <div className="from-gray-900 to-gray-700 bg-gradient-to-b min-h-screen ">
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
          <Link
            href="/training-history"
            className="self-end text-white font-medium rounded-lg text-md px-5 py-2 mt-2 text-center bg-gradient-to-br from-green-700 via-green-600 to-green-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 "
          >
            Run Training
          </Link>
        </div>
      </div>
    </div>
  );
}
