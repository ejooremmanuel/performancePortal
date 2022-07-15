/* eslint-disable react-hooks/exhaustive-deps */
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
import { NativeSelect } from "../../components/Select";
import { EditIcon } from "@chakra-ui/icons";
import image from "../../assets/user.png";
import { Tooltip } from "@material-ui/core";

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
      export: false,
      render: ({ photo }) => {
        return (
          <img
            src={`${photo ?? image}`}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
        );
      },
    },
    {
      title: "Staff Name",
      field: `fullname`,
      render: ({ fullname }) => {
        return fullname ? fullname : <span style={{ color: "red" }}>NA</span>;
      },
    },
    { title: "Gender", field: `gender` },
    { title: "Email Address", field: "email", type: "string" },
    { title: "Department", field: "department", type: "string" },
    { title: "Role", field: "role" },
    { title: "State", field: "state" },
    { title: "Mobile No", field: "mobile" },
    {
      title: "Line Manager",
      field: "manager[fullname]",
      render: (props) => {
        return props?.manager?.fullname ? (
          props?.manager?.fullname
        ) : (
          // <span style={{ color: "red" }}>Select staff line manager</span>
          <Tooltip title="Select staff line manager" placement="top">
            <button
              onClick={(event) => actionHandler(props)}
              className={actionBtn ? "btn__action" : "btn__action--hide"}
            >
              <EditIcon style={{ color: "red" }} />
            </button>
          </Tooltip>
        );
      },
    },
    {
      title: "Department Manager",
      field: "departmentManager[fullname]",
      render: ({ departmentManager }) => {
        return departmentManager?.fullname ? (
          departmentManager?.fullname
        ) : (
          <span style={{ color: "red" }}>NA</span>
        );
      },
    },
    { title: "Date of Birth", field: "dob" },
    { title: "Short Bio", field: "bio" },
    { title: "CUG", field: "cug" },
    { title: "Emergency Contact Name", field: "emergencyContactName" },
    { title: "Emergency Contact Email", field: "emergencyContactEmail" },
    { title: "Emergency Contact Address", field: "emergencyContactAddress" },
    { title: "Account Number", field: "accountNumber" },
    { title: "Bank Name", field: "bank" },
    { title: "BVN", field: "bvn" },
    { title: "NIN", field: "nin" },
    {
      title: "Date Created",
      field: `createdAt`,
      type: "date",
    },
  ];

  const navigate = useNavigate();

  const getEmployees = () => {
    const token =
      JSON.parse(localStorage.getItem("staffInfo")) &&
      JSON.parse(localStorage.getItem("staffInfo")).token;

    if (!token) {
      navigate("/");
      return;
    }

    setFetching(true);
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/employees/all`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": token,
        },
      })
      .then((response) => {
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
              pageSizeOptions: [1, 3, 5],
              exportAllData: true,

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
          allStaff={list}
        />
      </div>
    </div>
  );
};

export default Employees;

export function EditEmployee({
  isOpen,
  onClose,
  data,
  getEmployees,
  allStaff = [],
}) {
  const [department, setDepartment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showDepartment, setShowDepartment] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [role, setRole] = React.useState("");
  const [rolesData, setRolesData] = React.useState([]);
  const [lineManager, setLineManager] = React.useState("");
  const [staff, setStaff] = React.useState({});

  React.useEffect(() => {
    console.log(data?.data);
    setRole(data?.data?.role ?? data?.role);
    setStaff(data?.data ?? data);
    setLineManager(data?.data?.manager._id ?? data?.manager?._id);
  }, [data]);

  const toast = useToast();

  const onChangeHandler = (e) => {
    setDepartment(e.target.value);
  };

  const showDepartmentHandler = (e) => {
    if (e.target.value === "Manager") {
      setRole("Manager");
    } else if (e.target.value === "HR") {
      setRole("HR");
    } else if (e.target.value === "Staff") {
      setRole("Staff");
    } else if (e.target.value === "Line Manager") {
      setRole("Line Manager");
    } else {
      setRole("");
    }
  };

  const yesHandler = (id) => {
    setLoading(true);
    axios
      .patch(
        `${BASE_URL}/api/v1/staff/auth/manager/${id}`,
        {
          role,
          manager: lineManager,
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
        setRole("");
        setLineManager("");
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
              minHeight: "35vh",
              boxSizing: "border-box",
              justifyContent: "flex-start",
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
                Edit Staff Information {<EditIcon />} | &nbsp;
                {staff?.fullname ?? "Staff"}
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  yesHandler(staff?._id);
                }}
                style={{
                  boxSizing: "border-box",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>Select Role</div>
                <div className="checkbox">
                  <input
                    type="radio"
                    value="Manager"
                    name="role"
                    onChange={showDepartmentHandler}
                    checked={role === "Manager"}
                  />
                  <div>Manager</div>
                </div>
                <div className="checkbox">
                  <input
                    type="radio"
                    value="Line Manager"
                    name="role"
                    onChange={showDepartmentHandler}
                    checked={role === "Line Manager"}
                  />
                  <div>Line Manager</div>
                </div>
                <div className="checkbox">
                  <input
                    type="radio"
                    name="role"
                    value="HR"
                    checked={role === "HR"}
                    onChange={showDepartmentHandler}
                  />
                  <div>Human Resource</div>
                </div>
                <div className="checkbox">
                  <input
                    type="radio"
                    name="role"
                    value="Staff"
                    checked={role === "Staff"}
                    onChange={showDepartmentHandler}
                  />
                  <div>Staff</div>
                </div>
                <div>
                  <NativeSelect
                    title="Select Staff Line Manager"
                    value={lineManager}
                    onChange={(e) => {
                      setLineManager(e.target.value);
                    }}
                    required
                  >
                    <option value="" disabled>
                      --Select--
                    </option>
                    {allStaff.map(({ _id, fullname }) => {
                      return <option value={_id}>{fullname}</option>;
                    })}
                  </NativeSelect>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <>
                    <button
                      onClick={() => {
                        onClose();
                      }}
                      type="button"
                      style={{
                        display: "flex",
                        width: "100px",
                        height: "40px",
                        background: "rgb(76, 97, 237)",
                        color: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5px",
                      }}
                    >
                      Cancel
                    </button>
                  </>

                  <>
                    {loading ? (
                      <button
                        style={{
                          display: "flex",
                          width: "150px",
                          height: "40px",
                          background: "rgb(76, 97, 237)",
                          color: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                        }}
                        disabled
                      >
                        Assigning...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!role}
                        style={{
                          display: "flex",
                          width: "100px",
                          height: "40px",
                          background: "rgb(76, 97, 237)",
                          color: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                        }}
                      >
                        Update
                      </button>
                    )}
                  </>
                </div>
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
