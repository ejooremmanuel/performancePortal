import axios from "axios";
import { FiSearch } from "react-icons/fi";
import React from "react";
import HRNavbar from "../../components/HR Navbar";
import HeaderImageUpload from "./HeaderImageUpload";
import { Options } from "../../components";
import { useToast } from "@chakra-ui/react";
import "./hr.styles.css";
import { BASE_URL } from "../../config";
import { NativeSelect } from "../../components/Select";
import MaterialTable from "material-table";
import { TableIcons } from "../../components/TableIcons/TableIcons";
import { CircularProgress } from "@material-ui/core";

const StartAppraisal = () => {
  const [loading, setLoading] = React.useState(false);
  // const { setAppraisalStarted, setQuarter } = React.useContext(UserContext);
  const toast = useToast();
  const [quarter, setQuarter] = React.useState("");
  const [session, setSession] = React.useState(
    new Date(Date.now()).getFullYear()
  );
  const [data, setData] = React.useState([]);
  const [action, setAction] = React.useState(false);

  const getData = () => {
    setLoading(true);
    axios.get(`${BASE_URL}/api/v1/appraisal/`).then((res) => {
      console.log(res.data);
      setLoading(false);
      setData(res.data.data);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const startHandler = (id) => {
    window.confirm("Are you sure you want to restart this appraisal?") &&
      axios
        .patch(
          `${BASE_URL}/api/v1/appraisal/start/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "access-token": JSON.parse(localStorage.getItem("staffInfo"))
                .token,
            },
          }
        )
        .then((res) => {
          getData();
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: `${err.response.data.msg}`,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        });
  };
  const stopHandler = (id) => {
    window.confirm("Are you sure you want to stop this appraisal?") &&
      axios
        .patch(
          `${BASE_URL}/api/v1/appraisal/${id}`,
          { status: "Stopped" },
          {
            headers: {
              "Content-Type": "application/json",
              "access-token": JSON.parse(localStorage.getItem("staffInfo"))
                .token,
            },
          }
        )
        .then((res) => {
          getData();
          // setData(res.data.data);
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: `${err.response.data.msg}`,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      quarter,
      session,
      status: "Pending",
    };
    setAction(true);
    axios
      .post(`${BASE_URL}/api/v1/appraisal/`, data, {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((res) => {
        getData();
        setAction(false);
      })
      .catch((err) => {
        setAction(false);
        toast({
          title: "Error",
          description: `${err.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const columns = [
    {
      title: "SN",
      field: `tableData[id]`,
      render: ({ tableData }) => {
        return tableData.id + 1;
      },
    },
    { title: "Session", field: "session" },
    { title: "Quarter", field: "quarter" },
    { title: "Status", field: "status" },
    { title: "Date", field: "createdAt", type: "date" },
  ];

  return (
    <div style={{ overflowX: "hidden" }}>
      <HRNavbar />
      <div className="hr__dashboard__container">
        <HRHeader />
        <div className="hr__dashboard__text">
          <h1>Configure Appraisal</h1>
        </div>
        <div className="StartAppraisal__container">
          <form onSubmit={submitHandler}>
            <div style={{ width: "100%" }}>
              <NativeSelect
                required={true}
                title="Choose a Quarter"
                value={quarter}
                onChange={(e) => {
                  setQuarter(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Quarter
                </option>
                {Options.Quarters.map((quarter) => {
                  return (
                    <option value={quarter} key={quarter}>
                      {quarter}
                    </option>
                  );
                })}
              </NativeSelect>
            </div>
            <div className="appraisal__input">
              {/* <label htmlFor="">Type Session</label> */}
              <input
                type="text"
                value={session}
                onChange={(e) => {
                  setSession(e.target.value);
                }}
                required
              />
            </div>
            {action ? (
              <button
                type="submit"
                style={{ padding: "20px" }}
                disabled
                className="appraisal__button"
              >
                Creating...
              </button>
            ) : (
              <button type="submit" className="appraisal__button">
                Create
              </button>
            )}
          </form>
          <hr />
          <div>
            <MaterialTable
              data={data}
              columns={columns}
              icons={TableIcons}
              title=""
              options={{
                exportButton: true,
                actionsCellStyle: {
                  color: "#FF00dd",
                },
                actionsColumnIndex: -1,
                loadingType: "Overlay",
                pageSizeOptions: [1, 3, 5],

                headerStyle: {
                  backgroundColor: "rgba(196, 196, 196, 0.32)",
                  color: "black",
                },
              }}
              style={{
                boxShadow: "none",
                boxSizing: "border-box",
                paddingLeft: "30px",
                background: "none",
                width: "90%",
                marginRight: "auto",
              }}
              actions={[
                {
                  icon: "more_horiz",
                  iconProps: {
                    style: { fontSize: "20px", color: "gold" },
                  },
                  tooltip: "View More",

                  onClick: (event, rowData) => {
                    // navigate(`/staff/report/${rowData._id}`);
                    rowData.status === "Started"
                      ? stopHandler(rowData._id)
                      : rowData.status === "Stopped"
                      ? startHandler(rowData._id)
                      : startHandler(rowData._id);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => {
                      props.action.onClick(event, props.data);
                    }}
                    className={`${
                      props.data.status === "Started"
                        ? "btn__stop"
                        : props.data.status === "Stopped"
                        ? "btn__start"
                        : "btn__pending"
                    }`}
                  >
                    {props.data.status === "Started"
                      ? "Stop"
                      : props.data.status === "Stopped"
                      ? "Restart"
                      : "Start"}
                  </button>
                ),
                OverlayLoading: () => <> {loading && <CircularProgress />}</>,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartAppraisal;

export function HRHeader() {
  return (
    <div className="hr__dashboard__header">
      <div className="header__search">
        <FiSearch />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="header__divider"></div>
      <HeaderImageUpload />
    </div>
  );
}

// {
//   currentMonth === "April" ? (
//     <div className="quarter__container">
//       <div>Start First Quarter Appraisal for {date.getFullYear()}</div>
//       <Button
//         isLoading={loading}
//         loadingText="Starting..."
//         colorScheme="green"
//         onClick={setStartAppraisal.firstQuarter}
//       >
//         Start <FaRocket />
//       </Button>
//     </div>
//   ) : currentMonth === "July" || currentMonth === "June" ? (
//     <div className="quarter__container">
//       <div>Start Second Quarter Appraisal for {date.getFullYear()}</div>
//       <Button
//         isLoading={loading}
//         loadingText="Starting..."
//         colorScheme="green"
//         onClick={setStartAppraisal.secondQuarter}
//       >
//         Start <FaRocket />
//       </Button>
//     </div>
//   ) : currentMonth === "October" ? (
//     <div className="quarter__container">
//       <div>Start Third Quarter Appraisal for {date.getFullYear()}</div>
//       <Button
//         isLoading={loading}
//         loadingText="Starting..."
//         colorScheme="green"
//         onClick={setStartAppraisal.thirdQuarter}
//       >
//         Start <FaRocket />
//       </Button>
//     </div>
//   ) : currentMonth === "December" ? (
//     <div className="quarter__container">
//       <div>Start Fourth Quarter Appraisal for {date.getFullYear()}</div>
//       <Button
//         isLoading={loading}
//         loadingText="Starting..."
//         colorScheme="green"
//         onClick={setStartAppraisal.fourthQuarter}
//       >
//         Start <FaRocket />
//       </Button>
//     </div>
//   ) : (
//     <div className="quarter__container">Check back</div>
//   );
// }
