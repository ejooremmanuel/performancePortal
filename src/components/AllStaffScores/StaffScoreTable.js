import React from "react";
import "../../screens/HR/hr.styles.css";
// import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TableIcons } from "../TableIcons/TableIcons";
import MaterialTable from "material-table";

const StaffScoreTable = ({ list }) => {
  const navigate = useNavigate();
  const onGetUserScore = (id, name) => {
    navigate(`/manager/rating/${id}`);
  };

  const columns = [
    {
      title: "SN",
      field: `tableData[id]`,
      render: ({ tableData }) => {
        return tableData.id + 1;
      },
    },
    { title: "Staff", field: "user[fullname]" },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Manager Score",
      field: "managerscore",
    },
    {
      title: "Staff Score",
      field: "score",
    },
  ];

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title="Appraise Team Members"
        columns={columns}
        data={list}
        options={{
          exportButton: false,
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
            tooltip: "Rate Staff",
            onClick: (event, rowData) => {
              onGetUserScore(rowData.user._id, rowData.fullname);
            },
          },
        ]}
      />
    </>
  );
};

export default StaffScoreTable;
