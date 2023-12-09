import clsx from "clsx";
import React, { lazy, Suspense } from "react";
import { RxCross1 } from "react-icons/rx";
import DropdownComponent from "./Dropdown";

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

  const OverlayComponent = lazy(() => import("@/components/card/Overlay"));

  const values = !progress
    ? null
    : Object.values(progress).reduce(
        (acc, epochData) => {
          acc.deltaPiArray.push(parseFloat(epochData["Loss/DeltaPi"]));
          acc.deltaValueArray.push(parseFloat(epochData["Loss/DeltaValue"]));
          acc.piArray.push(parseFloat(epochData["Loss/Pi"]));
          acc.valueArray.push(parseFloat(epochData["Loss/Value"]));
          return acc;
        },
        { deltaPiArray: [], deltaValueArray: [], piArray: [], valueArray: [] }
      );

  const statusToColor = {
    completed: "bg-green-300",
    running: "bg-green-400",
    error: "bg-red-500",
    queued: "bg-violet-400",
    shutdown: "bg-red-500",
  };
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
              `${statusToColor[status.toLowerCase()]}`
            )}
          >
            {status}
          </div>
          <DropdownComponent />
        </div>
        <div className="flex gap-x-2 rounded-lg border bg-gray-200 w-fit px-1 text-sm">
          <div>{timestamp}</div>
        </div>
        <p className="text-gray-700 text-base text-justify mt-4">
          mid = {mid} <br /> nb_cores = {nb_cores}, epochs = {epochs}, env_id ={" "}
          {env_id}, alg ={alg}
        </p>
        {values && (
          <button
            className="bg-red-100 border border-red-400 px-4 py-2 rounded mt-4"
            onClick={() => setShowLazyOverlayPage(true)}
          >
            Show training details
          </button>
        )}
      </div>

      {values && showLazyOverlayPage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[900]"
          onClick={() => setShowLazyOverlayPage(false)}
        >
          <div
            className="flex flex-col bg-white pb-6 px-6 pt-2 rounded shadow-lg w-10/12 min-h-[90%] max-h-full"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex">
              <div className="flex flex-1 items-center justify-center text-gray-700 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                Training Results
              </div>
              <div className="flex">
                {/* TODO center CROSS button  */}
                <button
                  className="mt-4 p-2 h-[50px] flex flex-1 items-center justify-center self-center"
                  onClick={() => setShowLazyOverlayPage(false)}
                >
                  <RxCross1 size={24} />
                </button>
              </div>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
              <OverlayComponent values={values} />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingCard;
