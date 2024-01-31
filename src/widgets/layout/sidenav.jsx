import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav, setSelectedKnowledge, setSelectedChannel, addKnowledge } from "@/context";
import { NewKnowledgeDialog } from "../dialogs/new-knowledge";
import { UpdateKnowledgeDialog } from "../dialogs/update-knowledge";
export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [newKnowledgeOpen, setNewKnowledgeOpen] = useState(false);
  const [updateKnowledgeOpen, setUpdateKnowledgeOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  // const [knowledges, setKnowledges] = useState([]);
  // const [chatHistory, setChatHistory] = useState([]);

  const { mainColor, sidenavType, openSidenav, selectedKnowledge, knowledges } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  useEffect(() => {
    // setChatHistory();
    // setKnowledges();
    // addKnowledge(dispatch, knowledges);
  }, []);


  const handleButton = (type) => {
    switch (type) {
      case "New Knowledge":
        setNewKnowledgeOpen(true);
        break;
      case "Update Knowledge":
        setUpdateKnowledgeOpen(true);
        break;
      case "New Conversation":
        setSelectedChannel(dispatch, "");
        break;
    }
  }

  const selectKnowledge = (type) => {
    setSelectedKnowledge(dispatch, type);
    setOpenMenu(false);
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="flex flex-col gap-4 m-4">
        <Menu open={openMenu} handler={setOpenMenu} offset={0}>
          <MenuHandler>
            <Button
              variant="outlined"
              color={
                sidenavType === "dark"
                  ? "white"
                  : "blue-gray"
              }
              className="p-2 capitalize"
              fullWidth
            >
              <div
                color="inherit"
                className="flex items-center justify-between px-2"
              >
                <Typography color="inherit" className="font-medium">
                  <i className="fas fa-file-lines mr-2" />
                  {selectedKnowledge}
                </Typography>
                {
                  openMenu ? (
                    <i className="fas fa-angle-up fa-lg" />
                  ) : (
                    <i className="fas fa-angle-down fa-lg" />
                  )
                }
              </div>
            </Button>
          </MenuHandler>
          <MenuList className="overflow-visible flex flex-col min-w-[260px] p-0 px-1 bg-gradient-to-br from-blue-gray-800 to-blue-gray-900">
            {
              knowledges.map(knowledge => (
                <MenuItem key={knowledge} className="py-2" onClick={() => selectKnowledge(knowledge)}>
                  <Typography color="white" className="font-medium text-lg">
                    <i className="fas fa-file-lines mr-2" />
                    {knowledge}
                  </Typography>
                </MenuItem>
              ))
            }
          </MenuList>
        </Menu>

        <div className="flex gap-1">
          <Button
            variant="outlined"
            color={
              sidenavType === "dark"
                ? "white"
                : "blue-gray"
            }
            className="p-2 capitalize basis-5/6"
            fullWidth
            onClick={() => handleButton('New Knowledge')}
          >
            <Typography
              color="inherit"
              className="font-medium"
            >
              <i className="fas fa-plus mr-2" />
              New Knowledge Base
            </Typography>
          </Button>
          <Button
            variant="outlined"
            color={
              sidenavType === "dark"
                ? "white"
                : "blue-gray"
            }
            className="px-2 py-2 capitalize basis-1/6"
            fullWidth
            onClick={() => handleButton('Update Knowledge')}
          >
            <i className="fas fa-cog fa-md" />
          </Button>
        </div>
        <Button
          variant="outlined"
          color={
            sidenavType === "dark"
              ? "white"
              : "blue-gray"
          }
          className="p-2 capitalize"
          fullWidth
          onClick={() => handleButton('New Conversation')}
        >
          <Typography
            color="inherit"
            className="font-medium"
          >
            <i className="fas fa-plus mr-2" />
            New Conversation
          </Typography>
        </Button>
      </div>
      <div className="mx-4">
        <p className="mx-6 text-white">{"Yesterday"}</p>
        <div className="flex flex-col my-2 cursor-pointer">
          <div className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded-md text-white relative">
            <div className="flex gap-2 items-center">
              <i className="fas fa-comments" />
              <p>{"Initial greeting and"}</p>
            </div>
            <div className="absolute right-1 top-1 flex gap-1">
              <IconButton className="rounded-full bg-blue-400" size="sm">
                <i className="fas fa-edit" />
              </IconButton>
              <IconButton className="rounded-full bg-blue-400" size="sm">
                <i className="fas fa-trash" />
              </IconButton>
            </div>
          </div>
          <div className="px-4 py-2 rounded-md text-white relative">
            <div className="flex gap-2 items-center">
              <i className="fas fa-comments" />
              <p>{"Initial greeting and"}</p>
            </div>
          </div>
        </div>
      </div>
      <NewKnowledgeDialog open={newKnowledgeOpen} setOpen={setNewKnowledgeOpen} type={true} />
      <UpdateKnowledgeDialog open={updateKnowledgeOpen} setOpen={setUpdateKnowledgeOpen} />
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Custom GPT",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
