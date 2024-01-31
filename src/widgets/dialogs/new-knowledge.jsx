import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { addKnowledge, useMaterialTailwindController } from "@/context";

export function NewKnowledgeDialog({ open, setOpen, type }) {
  // if("Notification" in window) {
  //   Notification.requestPermission().then(function(result) {
  //     if (result === "denied") {
  //       console.log("Permission wasn't granted.");
  //       return;
  //     }
  //     if(result === "granted") {
  //       const notification = new Notification("Hello!", {
  //         body: "This is a test notification."
  //       })
  //     }
  //   });
  // }

  const [controller, dispatch] = useMaterialTailwindController();
  const [knowledgeName, setKnowledgeName] = useState('');
  const [knowledgeUrls, setKnowledgeUrls] = useState([{
    id: 0,
    url: ""
  }]);

  const handleOpen = () => setOpen((cur) => !cur);

  const AddLink = () => {
    setKnowledgeUrls(Urls => [...Urls, {
      id: Urls[Urls.length - 1].id + 1,
      url: ''
    }]);
  };

  const DeleteLink = id => {
    setKnowledgeUrls(Urls => Urls.filter(one => one?.id !== id));
  }

  const handleLink = (e, id) => {
    const newUrls = knowledgeUrls.map((url) => {
      if (url.id === id) {
        url.url = e.target.value;
      }
      return url;
    });
    setKnowledgeUrls(newUrls);
  }

  const fileRead = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = () => {
        let baseId = knowledgeUrls.length === 1 && knowledgeUrls[0].url === '' ? 0 : knowledgeUrls[knowledgeUrls.length - 1].id + 1;
        const data = reader.result.split('\r\n').map((line, index) => ({
          id: baseId + index,
          url: line
        }));

        if (knowledgeUrls.length === 1 && knowledgeUrls[0].url === '')
          setKnowledgeUrls(data);
        else {
          setKnowledgeUrls(prev => [...prev, ...data]);
        }
      }
    }
  }

  const handleCreate = () => {
    axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/add_knowledge`, {
      user_id: '123',
      knowledge_name: knowledgeName,
      knowledge_urls: knowledgeUrls.map(item => item.url)
    })
      .then(res => {
        if (res?.status === 200) {
          if (res?.data?.knowledge_name) {
            addKnowledge(dispatch, res.data.knowledge_name);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
    setOpen(false);

    setKnowledgeName("");
    setKnowledgeUrls([{
      id: 0,
      url: ""
    }])
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none min-w-[83.3%] md:min-w-[33.3%]"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {`${type === true ? 'New' : 'Update'} Knowledge Base`}
            </Typography>

            <hr />

            <div className="max-h-[24rem] overflow-y-auto scroll-smooth">
              <div className="flex flex-col gap-4">
                {type && (
                  <>
                    <Typography className="-mb-2" variant="h6">
                      Name your knowledge base
                    </Typography>
                    <Input
                      type="text"
                      label="Knowledge base name"
                      name="knowledgeName"
                      size="lg"
                      value={knowledgeName}
                      onChange={(e) => setKnowledgeName(() => e.target.value)}
                    />
                  </>
                )}

                <Typography className="-mb-2" variant="h6">
                  Upload URL
                </Typography>
                {
                  knowledgeUrls.map(one => (
                    <div key={one?.id} id={one?.id}>
                      <div className="flex gap-1">
                        <Input
                          label="Add your URL"
                          size="lg"
                          icon={knowledgeUrls.length > 1 && <i className="fas fa-xmark cursor-pointer" onClick={() => DeleteLink(one?.id)} />}
                          value={one?.url}
                          onChange={(e) => handleLink(e, one?.id)}
                        />
                      </div>
                    </div>
                  ))}

                <Button className="p-2 text-md capitalize" variant="gradient" onClick={AddLink}>
                  Add another link
                </Button>

                <Typography className="-mb-2" variant="h6">
                  Upload a text file
                </Typography>
                <label htmlFor="fusk" className="text-center bg-blue-400 p-3 rounded-md text-white text-sm font-bold cursor-pointer" variant="gradient">
                  SELECT TEXT FILE
                </label>
                <input className="hidden" id="fusk" type="file" name="photo" onChange={e => fileRead(e)}></input>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-6">
            <Button
              className="text-sm"
              variant="gradient"
              onClick={handleCreate}
              fullWidth
              disabled={knowledgeName === '' || knowledgeUrls[0].url === ''}
            >
              + Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}