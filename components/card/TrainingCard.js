import clsx from "clsx";
import React, { lazy, Suspense } from "react";
import { RxCross1 } from "react-icons/rx";
import DropdownComponent from "./Dropdown";
import { Badge } from "@nextui-org/react";

const isDifferenceMoreThan60Days = (timestamp1, timestamp2) => {
  // Calculate the difference in milliseconds
  const difference = Math.abs(timestamp1 - timestamp2);
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const daysDifference = difference / millisecondsInDay;

  // Check if the difference is less than 30 days
  return daysDifference > 60;
};

const TrainingCard = ({
  title = "Auto-generated title",
  mid = "2c02b40bb6de4594aa3752d2538f2c58",
  timestamp = "2023-11-28_11:39:55",
  nb_cores = 4,
  epochs = 3,
  env_id = "DroneHoverBulletEnv-v0",
  alg = "ppo",
  status = "Completed",
  container_nodename = "",
  uid,
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

  const dropdownRequestParams = {
    mid,
    uid,
    container_nodename,
  };

  const formatTimestampOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date =
    typeof timestamp === "number"
      ? new Intl.DateTimeFormat("en-GB", formatTimestampOptions).format(
          timestamp
        )
      : timestamp;

  const currentTimestamp = new Date().getTime();

  return (
    <Badge
      content="New"
      size="md"
      color="danger"
      placement="top-left"
      className="shadow-md"
      //TODO change this into less days
      isInvisible={isDifferenceMoreThan60Days(currentTimestamp, timestamp)}
    >
      <div className="w-full border-r border-b border-l border-gray-400 bg-white rounded-b p-4">
        <div className="flex items-center gap-x-2 truncate">
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
          <DropdownComponent
            status={status}
            dropdownRequestParams={dropdownRequestParams}
            setShowLazyOverlayPage={setShowLazyOverlayPage}
          />
        </div>
        <div className="flex gap-x-2 rounded-lg border bg-gray-200 w-fit px-1 text-sm">
          <div>{date}</div>
        </div>
        <p className="text-gray-700 text-base text-justify mt-4 truncate">
          mid = {mid} <br /> nb_cores = {nb_cores}, epochs = {epochs}, env_id ={" "}
          {env_id}, alg ={alg}
        </p>
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
    </Badge>
  );
};

export default TrainingCard;
