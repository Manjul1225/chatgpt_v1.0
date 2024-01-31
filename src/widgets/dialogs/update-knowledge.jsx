import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { NewKnowledgeDialog } from "./new-knowledge";
import { useMaterialTailwindController } from "@/context";

const TABLE_HEAD = ["File Name", "Upload Date"];

const TABLE_ROWS = [
  {
    name: "Manager",
    date: "23/04/18",
  },
  {
    name: "Developer",
    date: "23/04/18",
  }
];

export function UpdateKnowledgeDialog({ open, setOpen }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { knowledges, selectedKnowledge } = controller;

  const [newKnowledgeOpen, setNewKnowledgeOpen] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [knowledge, setKnowledge] = useState('');

  useEffect(() => {
    setKnowledge(selectedKnowledge);
  }, [selectedKnowledge]);

  const handleOpen = () => !newKnowledgeOpen && setOpen(prev => !prev);

  const selectKnowledge = (type) => {
    setKnowledge(type);
  };

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="min-w-[650px]">
      <DialogBody divider className="flex gap-6 p-4">
        <div className="w-2/5 bg-blue-gray-800 rounded-md px-2 py-4">
          <Input
            className="!text-white"
            type="text"
            label="Search"
            size="lg"
            icon={<i className="fas fa-search" />}
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />

          {
            knowledge !== "FAQ" && (
              <Typography className="text-white mt-12 text-sm cursor-pointer">
                Delete All
              </Typography>
            )}

          <ul className="flex flex-col my-4">
            {
              knowledges.filter(one => one !== 'FAQ' && one.toLowerCase().includes(searchWord.toLowerCase())).map(one => (
                one === knowledge ? (
                  <li key={one} className="pl-4 py-2 bg-blue-400 rounded-md text-white">
                    <div className="flex gap-2 items-center justify-between font-medium">
                      <p>{one}</p>
                      <IconButton className="rounded-full bg-blue-400" size="sm">
                        <i className="fas fa-trash" />
                      </IconButton>
                    </div>
                  </li>
                ) : (
                  <li key={one} className="pl-4 py-2 rounded-md text-white" onClick={() => selectKnowledge(one)}>
                    <div className="flex gap-2 items-center justify-between font-medium">
                      <p>{one}</p>
                    </div>
                  </li>
                )
              ))
            }
          </ul>
        </div>
        <div className="w-3/5">
          <h2 className="text-xl font-medium">Knowledge Base Settings</h2>
          <p>2260 characters</p>

          <div className="mt-4 flex items-center gap-8">
            {
              knowledge !== "FAQ" && (
                <div className="flex items-center gap-4">
                  <Typography className="font-medium text-xl">
                    {selectedKnowledge}
                  </Typography>
                  <Button className="p-2" variant="text" color="blue-gray">
                    <i className="fas fa-edit fa-lg" />
                  </Button>
                </div>
              )
            }
            <Button
              className="p-2 capitalize"
              variant="outlined"
              color="blue-gray"
            >
              <i className="fas fa-arrow-up-right-from-square mr-2" />
              Export Content
            </Button>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-1">
              <Input
                className="!text-white"
                type="text"
                label="Search"
                size="lg"
                icon={<i className="fas fa-search" />}
              />
            </div>
            {
              knowledge !== "FAQ" && (
                <Button
                  className="p-3 capitalize"
                  variant="outlined"
                  color="blue-gray"
                  size="lg"
                  onClick={() => setNewKnowledgeOpen(prev => !prev)}
                >
                  Add Content
                </Button>
              )
            }
          </div>

          <table className="w-full table-auto text-left mt-4">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 w-10">
                  <Checkbox color="blue-gray" />
                </th>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                    <Typography
                      variant="small"
                      className="font-medium leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 w-10">
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, date }, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="w-10">
                    <Checkbox color="blue-gray" />
                  </td>
                  <td className="p-2">
                    <Typography variant="small" className="font-medium">
                      {name}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography variant="small" className="font-medium">
                      {date}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <IconButton variant="text" color="blue-gray">
                      <i className="fas fa-trash" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogBody >

      <NewKnowledgeDialog open={newKnowledgeOpen} setOpen={setNewKnowledgeOpen} />
    </Dialog >
  );
}