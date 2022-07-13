import React from "react";
import { MenuItem, Modal, Select } from "@material-ui/core";
import axios from "axios";
import { createItemRequest } from "../../../../services";
import "../screen.css";
import { Button, CancelButton } from "../../../../components/";
import { BASE_URL } from "../../../../config";

//@ desc: create item modal
//@ return: JSX.Element
//@ param: open(bool), handleClose(func), setItems(func), items(arr)
const CreateItem = ({ open, handleClose, setItems, items }) => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [parentId, setParentId] = React.useState("");
  const [staffMembers, setStaffMembers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/staff/auth/employees/all`)
      .then((response) => {
        setStaffMembers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      manager: parentId,
    };
    createItemRequest(data, setLoading, setItems).then(() => {
      handleClose();
      setName("");
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContainer">
          <CancelButton handleClose={handleClose} />
          <h4>New Department</h4>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="">Department</label>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Choose Manager</label>
              <Select
                value={parentId}
                onChange={(e) => {
                  setParentId(e.target.value);
                }}
              >
                <MenuItem value="">--Select Manager--</MenuItem>
                {staffMembers
                  // .filter(
                  //   (item) =>
                  //     item.role === "Manager" ||
                  //     (item.roles && item.roles.includes("Manager"))
                  // )
                  .map((item) => {
                    return (
                      <MenuItem value={item._id} key={item._id}>
                        {item?.fullname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <Button
              loading={loading}
              loadingText="Adding..."
              disabled={name.length ? false : true}
              text="Add"
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateItem;
