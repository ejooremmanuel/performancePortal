import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { AddTwoTone } from "@material-ui/icons";
import "./allItems.styles.css";
import { closeModal, openModal } from "../../../../components/Helpers";
import { getItems } from "../../../../services";
import CreateItem from "../CreateItem/CreateItem";
import { FaRegTimesCircle, FaPen } from "react-icons/fa";
import UpdateItem from "../UpdateItem/UpdateItem";
import DeleteItem from "../DeleteItem/DeleteItem";
import { CircularProgress } from "@material-ui/core";
import { TableIcons } from "../../../../components/TableIcons/TableIcons";
import { HRNavbar } from "../../../../components";
import { HRHeader } from "../../CreateAppraisal";

//@ desc: view all items table
//@ return: JSX.Element
//@ param: none
const AllItems = () => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openAddItemModal, setOpenAddItemModal] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    getItems(setItems, setLoading);
  }, []);

  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: ({ tableData }) => {
        return <div className="name">{tableData.id + 1}</div>;
      },
    },
    {
      title: "Department",
      field: "name",
    },
    {
      title: "Manager",
      field: "manager[fullname]",
    },
  ];

  const handleEdit = (rowData) => {
    setOpenEditModal(true);
    setData(rowData);
  };
  const handleDelete = (rowData) => {
    setOpenDeleteModal(true);
    setData(rowData);
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
          <h1>Assign Manager</h1>
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <MaterialTable
                icons={TableIcons}
                title=""
                columns={columns}
                data={items}
                options={{
                  exportButton: { csv: true, pdf: false },
                  actionsCellStyle: {
                    color: "#FF00dd",
                  },
                  actionsColumnIndex: -1,
                  pageSize: 5,
                  pageSizeOptions: [1, 2, 5],
                  exportAllData: true,

                  headerStyle: {
                    backgroundColor: "rgba(196, 196, 196, 0.32)",
                    color: "black",
                  },
                }}
                style={{
                  boxShadow: "none",
                  width: "90%",
                  boxSizing: "border-box",
                  paddingLeft: "30px",
                  marginLeft: "30px",
                  marginTop: "30px",
                }}
                actions={[
                  {
                    iconProps: {
                      style: { fontSize: "20px", color: "gold" },
                    },
                    tooltip: "Edit",

                    onClick: (event, rowData) => {
                      handleEdit(rowData);
                    },
                  },
                  {
                    iconProps: {
                      style: { fontSize: "20px", color: "gold" },
                    },
                    tooltip: "Delete",

                    onClick: (event, rowData) => {
                      handleDelete(rowData);
                    },
                  },
                ]}
                components={{
                  Action: (props) => (
                    <button
                      onClick={(event) =>
                        props.action.onClick(event, props.data)
                      }
                      className="tableIcon"
                    >
                      <span>
                        {props.action.tooltip === "Edit" ? (
                          <FaPen />
                        ) : (
                          <FaRegTimesCircle />
                        )}
                      </span>
                    </button>
                  ),
                  // Add a custom toolbar component
                  Toolbar: (props) => (
                    <>
                      <MTableToolbar {...props} />
                      <div
                        className="addItemBtnContainer"
                        onClick={() => {
                          openModal(setOpenAddItemModal);
                        }}
                      >
                        <span>
                          <AddTwoTone />
                        </span>
                        <span>Add Department</span>
                      </div>
                    </>
                  ),
                  OverlayLoading: () => {
                    <div>
                      <CircularProgress />
                    </div>;
                  },
                }}
              />
            </>
          )}
          <CreateItem
            open={openAddItemModal}
            setItems={setItems}
            handleClose={() => {
              closeModal(setOpenAddItemModal);
            }}
            items={items}
          />
          <UpdateItem
            open={openEditModal}
            handleClose={() => {
              closeModal(setOpenEditModal);
            }}
            data={data}
            setItems={setItems}
            items={items}
          />
          <DeleteItem
            open={openDeleteModal}
            handleClose={() => {
              closeModal(setOpenDeleteModal);
            }}
            data={data}
            setItems={setItems}
          />
        </div>
      </div>
    </div>
  );
};

export default AllItems;
