/* eslint-disable no-unused-vars */
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
} from "@chakra-ui/react";
import { BASE_URL } from "../../config";

const Employees = () => {
  const [list, setList] = React.useState([]);
  const [actionBtn, setActionBtn] = React.useState(false);
  const [data, setData] = React.useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetching, setFetching] = React.useState(false);

  const columns = [
    {
      title: "SN",
      field: `tableData[id]`,
      render: ({ tableData }) => {
        return tableData.id + 1;
      },
    },
    {
      title: "Photo",
      field: `photo`,
      render: ({ photo }) => {
        return <img src={`${photo}`} alt="" />;
      },
    },
    { title: "Staff Name", field: `fullname` },
    { title: "Email Address", field: "email", type: "string" },
    { title: "Department", field: "department", type: "string" },
    { title: "Role", field: "role" },
    { title: "Manager", field: "manager[fullname]" },
    {
      title: "Date Created",
      field: `createdAt`,
      type: "date",
    },
  ];

  const navigate = useNavigate();

  console.log(setActionBtn);

  const getEmployees = () => {
    setFetching(true);
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/employees/all`, {
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
          <h1>Employees</h1>
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
                  navigate(`/staff/report/${rowData._id}`);
                },
              },
            ]}
            components={{
              Action: (props) => (
                <button
                  onClick={(event) => actionHandler(props)}
                  className={actionBtn ? "btn__action" : "btn__action--hide"}
                >
                  <MoreHorizOutlined />
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

export default Employees;

export function EditEmployee({ isOpen, onClose, data, getEmployees }) {
  const [department, setDepartment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showDepartment, setShowDepartment] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [role, setRole] = React.useState("");

  const toast = useToast();

  const onChangeHandler = (e) => {
    setDepartment(e.target.value);
  };

  const showDepartmentHandler = (e) => {
    if (e.target.checked && e.target.value === "Manager") {
      setRole("Manager");
      setShowDepartment(true);
      setRoles((prevState) => [...prevState, "Manager"]);
      return;
    }
    if (e.target.checked && e.target.value === "HR") {
      setRole("HR");
      setRoles((prevState) => [...prevState, "HR"]);
      return;
    }
    if (!e.target.checked && e.target.value === "Manager") {
      setRole("");
      setRoles((prevState) => prevState.filter((role) => role !== "Manager"));
      setShowDepartment(false);
      return;
    }
    if (!e.target.checked && e.target.value === "HR") {
      setRole("");
      setRoles((prevState) => prevState.filter((role) => role !== "HR"));
      return;
    }
  };

  const yesHandler = (id) => {
    setLoading(true);
    axios
      .patch(
        `${BASE_URL}/api/v1/staff/auth/manager/${id}`,
        {
          roles,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
          },
        }
      )
      .then((response) => {
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
        setDepartment("");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
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
          <ModalBody
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              width: "30vw",
              minHeight: "30vh",
              boxSizing: "border-box",
            }}
          >
            <ModalCloseButton />
            <div
              style={{
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h1 className="formHeading">
                Configure Role | {data.data && data.data.fullname}
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  yesHandler(data.data && data.data._id);
                }}
                style={{
                  boxSizing: "border-box",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div className="checkbox">
                  <input
                    type="checkbox"
                    value="Manager"
                    onChange={showDepartmentHandler}
                  />
                  <div>Manager</div>
                </div>
                {/* {showDepartment && (
                  <div>
                    <div>Choose Department</div>
                    <Select
                      options={Options.Departments}
                      value={department}
                      onChange={onChangeHandler}
                      required={true}
                    />
                  </div>
                )} */}
                <div className="checkbox">
                  <input
                    type="checkbox"
                    value="HR"
                    onChange={showDepartmentHandler}
                  />
                  <div>Human Resource</div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <div className="btn">
                    <button
                      onClick={() => {
                        onClose();
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="btn">
                    {loading ? (
                      <button disabled>Assigning...</button>
                    ) : (
                      <button type="submit" disabled={!role || !roles.length}>
                        Configure
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
