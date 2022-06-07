import React from "react";
import "../../screens/HR/hr.styles.css";
// import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TableIcons } from "../TableIcons/TableIcons";
import MaterialTable from "material-table";

const StaffScoreTable = ({ itemsPerPage, list }) => {
  const navigate = useNavigate();
  const onGetUserScore = (id, name) => {
    navigate(`/manager/rating/${id}`);
  };

  const columns = [{ title: "Staff", field: "fullname" }];

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title="Team Members"
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
            tooltip: "View Staff Rating",
            onClick: (event, rowData) => {
              onGetUserScore(rowData._id, rowData.fullname);
            },
          },
        ]}
      />
    </>
  );
};

export default StaffScoreTable;
