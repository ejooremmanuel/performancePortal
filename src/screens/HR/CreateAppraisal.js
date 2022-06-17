import { AddIcon } from "@chakra-ui/icons";
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { HRNavbar } from "../../components";
import { BASE_URL } from "../../config";
import "../Appraisal/appraisal.css";
import HeaderImageUpload from "./HeaderImageUpload";

const CreateAppraisal = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();
  const onSubmit = (e) => {
    const accessToken = JSON.parse(localStorage.getItem("staffInfo")).token;
    e.preventDefault();
    setLoading(true);
    const data = { title, description };
    axios
      .post(`${BASE_URL}/api/v1/section/a`, data, {
        headers: {
          accept: "application/json",
          "access-token": `${accessToken}`,
        },
      })
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
    <div
      style={{
        overflowX: "hidden",
      }}
    >
      <HRNavbar />
      <HRHeader />
      <div className="create__appraisal__container">
        <div className="hr__dashboard__text">
          <h1>Create Section A Grading Criteria</h1>
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
              disabled={!description && !title}
            >
              Create Appraisal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppraisal;

export function HRHeader() {
  return (
    <div
      className="hr__dashboard__header"
      style={{ width: "90%", left: "13%" }}
    >
      <div className="header__search">
        <FiSearch />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="header__divider"></div>

      <HeaderImageUpload />
    </div>
  );
}
