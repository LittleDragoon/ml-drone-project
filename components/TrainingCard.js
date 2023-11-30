import { FaTrash } from "react-icons/fa";
import clsx from "clsx";

const TrainingCard = ({
  title = "This is a Title",
  uid = "fRByVpqIFVabktusEHK7Mj3RDU42",
  mid = "2c02b40bb6de4594aa3752d2538f2c58",
  timestamp = "2023-11-28_11:39:55",
  nb_cores = 4,
  epochs = 3,
  env_id = "DroneHoverBulletEnv-v0",
  alg = "ppo",
  status = "Completed",
}) => {
  return (
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
    </div>
  );
};

export default TrainingCard;
