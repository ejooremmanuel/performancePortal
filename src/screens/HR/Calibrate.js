import axios from "axios";
import React from "react";
import "./hr.styles.css";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { MoreHorizOutlined } from "@material-ui/icons";
import MaterialTable from "material-table";
import { HRNavbar, Options, Select } from "../../components";
import { HRHeader } from "./CreateAppraisal";
import { useNavigate } from "react-router-dom";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const Calibrate = () => {
  const [list, setList] = React.useState([]);
  const [actionBtn, setActionBtn] = React.useState(false);
  const [data, setData] = React.useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetching, setFetching] = React.useState(false);

  const columns = [
    { title: "Staff", field: "user[fullname]", type: "string" },
    { title: "Staff Score", field: "score", type: "string" },
    { title: "Quarter", field: "quarter", type: "string" },
    { title: "Status", field: "status" },
    {
      title: "Date Completed",
      field: `createdAt`,
      type: "date",
    },
  ];

  const navigate = useNavigate();

  const getEmployees = () => {
    setFetching(true);
    axios
      .get("/api/v1/result", {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setList(response.data.data);
        setFetching(false);
      })
      .catch((error) => {
        console.log(error.response);
        setFetching(false);
      });
  };

  React.useEffect(() => {
    getEmployees();
  }, []);

  const actionHandler = (response) => {
    onOpen();
    setData(response);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <HRNavbar />
      <HRHeader />
      <div
        style={{
          marginLeft: "13%",
          boxSizing: "border-box",
          paddingRight: "20px",
          overflow: "hidden",
        }}
      >
        <div className="hr__dashboard__text">
          <h1>Calibrate Staff</h1>
        </div>
        {fetching ? (
          <div className="loader">fetching...</div>
        ) : (
          <MaterialTable
            icons={{
              Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
              Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
              Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
              Delete: forwardRef((props, ref) => (
                <DeleteOutline {...props} ref={ref} />
              )),
              DetailPanel: forwardRef((props, ref) => (
                <ChevronRight {...props} ref={ref} />
              )),
              Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
              Export: forwardRef((props, ref) => (
                <SaveAlt {...props} ref={ref} />
              )),
              Filter: forwardRef((props, ref) => (
                <FilterList {...props} ref={ref} />
              )),
              FirstPage: forwardRef((props, ref) => (
                <FirstPage {...props} ref={ref} />
              )),
              LastPage: forwardRef((props, ref) => (
                <LastPage {...props} ref={ref} />
              )),
              NextPage: forwardRef((props, ref) => (
                <ChevronRight {...props} ref={ref} />
              )),
              PreviousPage: forwardRef((props, ref) => (
                <ChevronLeft {...props} ref={ref} />
              )),
              ResetSearch: forwardRef((props, ref) => (
                <Clear {...props} ref={ref} />
              )),
              Search: forwardRef((props, ref) => (
                <Search {...props} ref={ref} />
              )),
              SortArrow: forwardRef((props, ref) => (
                <ArrowDownward {...props} ref={ref} />
              )),
              ThirdStateCheck: forwardRef((props, ref) => (
                <Remove {...props} ref={ref} />
              )),
              ViewColumn: forwardRef((props, ref) => (
                <ViewColumn {...props} ref={ref} />
              )),
            }}
            title=""
            columns={columns}
            data={list}
            options={{
              exportButton: true,
              actionsCellStyle: {
                color: "#FF00dd",
              },
              actionsColumnIndex: -1,

              headerStyle: {
                backgroundColor: "rgba(196, 196, 196, 0.32)",
                color: "black",
              },
            }}
            style={{
              boxShadow: "none",
              boxSizing: "border-box",
              paddingLeft: "20px",
              background: "none",
            }}
            actions={[
              {
                icon: "more_horiz",
                iconProps: {
                  style: { fontSize: "20px", color: "gold" },
                },
                tooltip: "View More",

                onClick: (event, rowData) => {
                  navigate(`/staff/calibrate/${rowData._id}`);
                },
              },
            ]}
            components={{
              Action: (props) => (
                <button
                  onClick={(event) => actionHandler(props)}
                  className={actionBtn ? "btn__action" : "btn__action--hide"}
                >
                  <FaEdit />
                </button>
              ),
            }}
          />
        )}
        <EditEmployee
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          getEmployees={getEmployees}
        />
      </div>
    </div>
  );
};

export default Calibrate;

export function EditEmployee({ isOpen, onClose, data, getEmployees }) {
  const [score, setScore] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const onChangeHandler = (e) => {
    setScore(e.target.value);
  };

  console.log(data);

  const calibrateHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `/api/v1/calibration/`,
        {
          score,
          staff: data.data && data.data._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        onClose();
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getEmployees();
        setLoading(false);
        setScore("");
      })
      .catch((error) => {
        console.log(error.response);
        toast({
          title: "Error",
          description: `An error has occurred!`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={calibrateHandler}
              style={{
                width: "300px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxSizing: "border-box",
                padding: "20px",
                gap: "15px",
              }}
            >
              <input
                type="text"
                value={score}
                onChange={onChangeHandler}
                required
                style={{
                  width: "300px",
                  height: "50px",
                  border: "1px solid #e6e6e6",
                  padding: "30px",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                }}
              />
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Calibrating..."
                colorScheme="green"
                rightIcon={<FaEdit />}
              >
                Calibrate
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
