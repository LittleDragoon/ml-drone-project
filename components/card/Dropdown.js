import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";
import { MdMoreHoriz } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiFolderDownloadFill } from "react-icons/ri";
import { IoIosOpen } from "react-icons/io";
import { RiShutDownLine } from "react-icons/ri";
import { shutdownTrainingRequest } from "@/api/trainingData";
import { deleteTrainingRequest } from "@/api/trainingData";

const DropdownComponent = ({
  status,
  dropdownRequestParams,
  setShowLazyOverlayPage,
}) => {
  const statusToDisabledKeys = {
    completed: ["shutdown"],
    running: ["open", "download", "delete"],
    error: ["open", "download", "shutdown"],
    queued: ["open", "download", "delete"],
    shutdown: ["open", "download", "shutdown"],
  };
  return (
    <Dropdown className="bg-white" showArrow>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <MdMoreHoriz size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        disabledKeys={statusToDisabledKeys[status]}
      >
        <DropdownSection title="Actions" showDivider>
          <DropdownItem
            key="open"
            startContent={<IoIosOpen size={22} />}
            description="Details of the training"
            onClick={() => {
              setShowLazyOverlayPage(true);
            }}
          >
            Open
          </DropdownItem>
          <DropdownItem
            key="download"
            startContent={<RiFolderDownloadFill size={20} />}
            description="Download files relevant of the training"
            onClick={() => {
              alert("Download feature incoming");
            }}
          >
            Download
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="shutdown"
            className="text-danger"
            color="danger"
            startContent={<RiShutDownLine size={18} />}
            description="Permanently stop the training"
            onClick={() => {
              shutdownTrainingRequest(dropdownRequestParams);
            }}
          >
            Shutdown
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<MdDelete size={22} />}
            description="Permanently delete the training"
            onClick={() => {
              deleteTrainingRequest({
                uid: dropdownRequestParams.uid,
                mid: dropdownRequestParams.mid,
              });
            }}
          >
            Delete
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
