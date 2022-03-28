import React from "react";
import { Header, Navigation, Greeting } from "../../components";
import { useSelector } from "react-redux";
import "./appraisal.css";
import {
  Button,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TableDisplay from "../../components/Table/TableDisplay";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const Initiative = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;

    axios
      .get("/api/v1/initiative", {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setList(response.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight">
        <Header title="Appraisal" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <div className="appraisal__intro__text">
          <h2>Balanced Scorecard</h2>
        </div>
        <div className="button">
          <Button colorScheme="green" onClick={onOpen} ml={3}>
            Set Initiative
          </Button>
        </div>
        <div className="display__initiative" style={{ marginLeft: "20px" }}>
          <TableDisplay itemsPerPage={5} list={list} setList={setList} />
        </div>
        <CreateInititiveForm
          isOpen={isOpen}
          onClose={onClose}
          setList={setList}
        />
      </div>
    </div>
  );
};

export default Initiative;

export function CreateInititiveForm({ isOpen, onClose, setList }) {
  const [options, setOptions] = React.useState([]);
  const btnRef = React.useRef();

  React.useEffect(() => {
    axios.get("/api/v1/perspective").then((response) => {
      setOptions(response.data.data);
    });
  }, []);

  const [initiative, setInitiative] = React.useState("");
  const [target, setTarget] = React.useState("");
  const [perspective, setPerspective] = React.useState("");
  const [measures, setMeasures] = React.useState("");
  const [objective, setObjective] = React.useState("");

  const submitData = () => {
    const data = {
      target,
      initiative,
      perspective,
      measures,
      objective,
      session: 2022,
    };

    const token = JSON.parse(localStorage.getItem("staffInfo")).token;

    axios
      .post("/api/v1/initiative", data, {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then((response) => {
        setList((prev) => {
          return [ response.data.data,...prev];
        });
        setInitiative("");
        setTarget("");
        setObjective("");
        onClose();
      })
      .catch((err) => {
        console.log(err.response);
        onClose();
      });
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Set Initiatives</DrawerHeader>

          <DrawerBody>
            <div>
              <label htmlFor="">Perspective</label>
              <Select
                mb={4}
                onChange={(e) => {
                  setPerspective(e.target.value);
                }}
              >
                <option value="">Select...</option>
                {options.map((option) => {
                  return (
                    <>
                      <option value={option._id}>{option.title}</option>;
                    </>
                  );
                })}
              </Select>
            </div>
            <div>
              <label htmlFor="">Objective</label>
              <Input
                placeholder="Type here..."
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                mb={4}
              />
            </div>
            <div>
              <label htmlFor="">Measures</label>
              <Select mb={4} onChange={(e) => setMeasures(e.target.value)}>
                <option>Select...</option>
                <option value="Annual">Annual</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Bi-annual">Bi Annual</option>
                <option value="Monthly">Monthly</option>
              </Select>
            </div>
            <div>
              <label htmlFor="">Target</label>
              <Textarea
                placeholder="Type here..."
                mb={4}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Initiative</label>
              <Textarea
                placeholder="Type here..."
                mb={4}
                value={initiative}
                onChange={(e) => setInitiative(e.target.value)}
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              rightIcon={<FaPlus />}
              onClick={(e) => {
                e.preventDefault();
                submitData();
              }}
            >
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
