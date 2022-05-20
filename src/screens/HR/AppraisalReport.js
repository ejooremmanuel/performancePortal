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
import MaterialTable from "material-table";
import { HRNavbar } from "../../components";
import { HRHeader } from "./CreateAppraisal";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Filter";

const AppraisalReport = () => {
  const [list, setList] = React.useState([]);
  const [findingData, setFindingData] = React.useState(false);
  const [divisions, setDivisions] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState("Choose Division");
  const [showDivisionSelect, setShowDivisionSelection] = React.useState(false);

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

  React.useEffect(() => {
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
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const filterHandler = (param) => {
    setSelected(param);

    const filteredData = list.filter((item) => {
      return item.division === param;
    });
    setFiltered(filteredData);
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
          <h1>Appraisal Report</h1>
        </div>
        <div style={{ width: "30%", paddingLeft: "30px" }}>
          <Filter
            showSelect={showDivisionSelect}
            setShowSelection={setShowDivisionSelection}
            value={selected}
          >
            <div
              style={{
                maxHeight: "450px",
                border: "1px solid rgba(0, 0, 0, 0.31)",
                overflowY: "scroll",
                backgroundColor: "#fff",
              }}
            >
              <div
                className={"container__content__select"}
                onClick={() => {
                  setShowDivisionSelection(false);
                  filterHandler("First Quarter");
                }}
              >
                First Quarter
              </div>
              <div
                className={"container__content__select"}
                onClick={() => {
                  setShowDivisionSelection(false);
                  filterHandler("Second Quarter");
                }}
              >
                Second Quarter
              </div>
            </div>
          </Filter>
        </div>
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
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
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
              icon: "visibility",
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
                onClick={(event) => props.action.onClick(event, props.data)}
                className=""
              >
                <span>{props.action.tooltip}</span>
              </button>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default AppraisalReport;
