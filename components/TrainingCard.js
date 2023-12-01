import { FaTrash } from "react-icons/fa";
import clsx from "clsx";
import React, { lazy, Suspense } from "react";

const TrainingCard = ({
  title = "This is a Title",
  mid = "2c02b40bb6de4594aa3752d2538f2c58",
  timestamp = "2023-11-28_11:39:55",
  nb_cores = 4,
  epochs = 3,
  env_id = "DroneHoverBulletEnv-v0",
  alg = "ppo",
  status = "Completed",
  progress,
}) => {
  //TODO Use React.portal instead ?
  const [showLazyOverlayPage, setShowLazyOverlayPage] = React.useState(false);

  const OverlayPage = lazy(() => import("@/components/overlay/Overlay"));

  const values = Object.values(progress).reduce(
    (acc, epochData) => {
      acc.deltaPiArray.push(parseFloat(epochData["Loss/DeltaPi"]));
      acc.deltaValueArray.push(parseFloat(epochData["Loss/DeltaValue"]));
      acc.piArray.push(parseFloat(epochData["Loss/Pi"]));
      acc.valueArray.push(parseFloat(epochData["Loss/Value"]));
      return acc;
    },
    { deltaPiArray: [], deltaValueArray: [], piArray: [], valueArray: [] }
  );
  return (
    <>
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
          <div>{timestamp}</div>
        </div>
        <p className="text-gray-700 text-base text-justify mt-4">
          mid = {mid} <br /> nb_cores = {nb_cores}, epochs = {epochs}, env_id ={" "}
          {env_id}, alg ={alg}
        </p>
        <button
          className="bg-red-100 border border-red-400 px-4 py-2 rounded mt-4"
          onClick={() => setShowLazyOverlayPage(true)}
        >
          Show training details
        </button>
      </div>

      {showLazyOverlayPage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[900]"
          onClick={() => setShowLazyOverlayPage(false)}
        >
          <div
            className="flex flex-col bg-white p-6 rounded shadow-lg w-11/12 min-h-[90%] max-h-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <OverlayPage values={values} />
            </Suspense>
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={() => setShowLazyOverlayPage(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingCard;
