import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MdMoreHoriz } from "react-icons/md";

const DropdownComponent = () => {
  return (
    <Dropdown className="bg-white">
      <DropdownTrigger>
        <Button>
          <MdMoreHoriz size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        disabledKeys={["download", "delete"]}
      >
        <DropdownItem key="open">Open training</DropdownItem>
        <DropdownItem key="download">Download training</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete training
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
