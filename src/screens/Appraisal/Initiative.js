/* eslint-disable no-unused-vars */
import React from "react";
import { Header, Navigation, Greeting } from "../../components";
import { useSelector } from "react-redux";
import "./appraisal.css";
import {
  Button,
  filter,
  Input,
  Select,
  Textarea,
  useDisclosure,
  useToast,
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
import { BASE_URL } from "../../config";

const Initiative = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useSelector((state) => state.userProfile);
  const { staff = {}, photo = "" } = userProfile;
  const [list, setList] = React.useState([]);
  const [perspective, setPerspective] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("staffInfo")).token;
    axios
      .get(`${BASE_URL}/api/v1/initiative`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then((response) => {
        setList(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, []);

  return (
    <div className="appContainer">
      <Navigation />
      <div className="contentsRight__Initiative">
        <Header title="Appraisal" name={staff.fullname} photo={photo} />
        <Greeting name={staff.fullname} />
        <div className="appraisal__intro__text">
          <h2>Balanced Scorecard</h2>
        </div>
        <div className="button">
          <Button
            colorScheme="green"
            onClick={onOpen}
            style={{
              marginLeft: "30px",
            }}
            width="350px"
          >
            Set
          </Button>
        </div>
        <div
          className="display__initiative"
          style={{
            marginLeft: "30px",
            height: "100%",
            width: "90%",
          }}
        >
          <TableDisplay
            itemsPerPage={5}
            list={list}
            setList={setList}
            perspective={perspective}
            loading={loading}
          />
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

export function CreateInititiveForm({
  isOpen,
  onClose,
  setList,
  initiatives = {},
  edit = false,
}) {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const btnRef = React.useRef();
  const toast = useToast();

  React.useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/perspective`).then((response) => {
      setOptions(response.data.data);
    });
  }, []);

  const [initiative, setInitiative] = React.useState(
    initiatives?.initiative ?? ""
  );
  const [target, setTarget] = React.useState(initiatives?.target ?? "");
  const [perspective, setPerspective] = React.useState(
    initiatives?.perspective?._id ?? ""
  );
  const [measures, setMeasures] = React.useState(initiatives?.measures ?? "");
  const [objective, setObjective] = React.useState(
    initiatives?.objective ?? ""
  );

  const submitData = () => {
    setLoading(true);
    const data = {
      target,
      initiative,
      perspective,
      measures,
      objective,
      session: 2022,
    };

    const token = JSON.parse(localStorage.getItem("staffInfo")).token;

    if (edit) {
      axios
        .patch(`${BASE_URL}/api/v1/initiative/${initiatives?._id}`, data, {
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
        })
        .then((response) => {
          axios
            .get(`${BASE_URL}/api/v1/initiative`, {
              headers: {
                "Content-Type": "application/json",
                "access-token": token,
              },
            })
            .then((res) => {
              setList(res.data.data);
              setLoading(false);
              setInitiative("");
              setTarget("");
              setObjective("");
              onClose();
              edit = false;
              toast({
                title: "Success",
                description: "Initiative updated successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            })
            .catch((err) => {
              console.log(err.response);
              setLoading(false);
            });
          // setInitiatives(response.data.data);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });

      axios.get(`${BASE_URL}/api/v1/perspective`).then((response) => {
        setPerspective(response.data.data);
      });
    } else {
      axios
        .post(`${BASE_URL}/api/v1/initiative`, data, {
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
        })
        .then((response) => {
          setLoading(false);
          setList((prev) => {
            return [response.data.data, ...prev];
          });
          setInitiative("");
          setTarget("");
          setObjective("");
          onClose();
          edit = false;
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });

      axios.get(`${BASE_URL}/api/v1/perspective`).then((response) => {
        setPerspective(response.data.data);
      });
    }
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
                      <option
                        value={option._id}
                        key={option._id}
                        selected={option._id === perspective}
                      >
                        {option.title}
                      </option>
                      ;
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
                <option value="Annual" selected={measures === "Annual"}>
                  Annual
                </option>
                <option value="Quarterly" selected={measures === "Quarterly"}>
                  Quarterly
                </option>
                <option value="Bi-annual" selected={measures === "Bi-annual"}>
                  Bi Annual
                </option>
                <option value="Monthly" selected={measures === "Monthly"}>
                  Monthly
                </option>
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
              disabled={!initiative || !target || !perspective || !measures}
              isLoading={loading}
              loadingText="Creating..."
              onClick={(e) => {
                e.preventDefault();
                submitData();
              }}
            >
              {edit ? "Update" : "Add"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
