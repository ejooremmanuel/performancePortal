import { AddIcon } from "@chakra-ui/icons";
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import "./appraisal.css";

const CreateAppraisal = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { title, description };
    axios
      .post("/api/v1/section/a", data)
      .then((res) => {
        toast({
          title: "Success",
          description: "Appraisal created successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTitle("");
        setDescription("");
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  return (
    <div className="create__appraisal__container">
      <div className="create__appraisal__heading">
        <h2>Create Appraisal</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Title</label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            loadingText="Creating..."
            isLoading={loading}
            colorScheme="green"
            rightIcon={<AddIcon />}
          >
            Create Appraisal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppraisal;
