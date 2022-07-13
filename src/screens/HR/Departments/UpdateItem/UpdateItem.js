import { Modal } from "@material-ui/core";
import React from "react";
import { updateItem } from "../../../../services";
import { Button, CancelButton } from "../../../../components";
import { BASE_URL } from "../../../../config";
import axios from "axios";

//@ desc: update item modal
//@ return: JSX.Element
//@ param: open(bool), handleClose(func), data(obj), setItems(func), items(arr)
const UpdateItem = ({ open, handleClose, data, setItems, items }) => {
  const [parentId, setParentId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [description, setDescription] = React.useState("");

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

  React.useEffect(() => {
    setNewName(data && data.name);
    setDescription(data && data.manager && data.manager.fullname);
    setParentId(data && data.manager && data.manager._id);
  }, [data, items]);

  const updateHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToUpdate = {
      name: newName,
      manager: parentId,
    };

    updateItem(data && data._id, dataToUpdate, setItems, setLoading)
      .then(() => {
        handleClose();
        setNewName("");
        setParentId("");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="modalContainer">
          <CancelButton handleClose={handleClose} />
          <h4>Update Department |&nbsp;{data && data.name}</h4>
          <form>
            <div>
              <label htmlFor="">Department</label>
              <input
                type="text"
                value={newName}
                placeholder="Name"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Current Manager</label>
              <input
                type="text"
                value={description}
                readOnly
                placeholder="Name"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="">Select New Manager</label>
              <select
                value={parentId}
                onChange={(e) => {
                  setParentId(e.target.value);
                }}
              >
                <option value="">--Select Manager--</option>
                {staffMembers
                  // .filter(
                  //   (item) =>
                  //     item.role === "Manager" ||
                  //     (item.roles && item.roles.includes("Manager"))
                  // )
                  .map((item) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.fullname}
                      </option>
                    );
                  })}
              </select>
            </div>

            <Button
              onClickHandler={updateHandler}
              loading={loading}
              loadingText="Updating..."
              text="Update"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateItem;
