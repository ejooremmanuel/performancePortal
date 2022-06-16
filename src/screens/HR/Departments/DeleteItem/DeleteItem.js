import React from "react";
import { Modal } from "@material-ui/core";
import { deleteItem } from "../../../../services";
import "./delete.css";

//@ desc: delete item modal
//@ return: JSX.Element
//@ param: open(bool), handleClose(func), data(obj), setItems(func), items(arr), height(num), width(num)

const DeleteItem = ({
  open,
  handleClose,
  data,
  height = 20,
  width = 30,
  setItems,
}) => {
  const [loading, setLoading] = React.useState(false);
  const handleDelete = () => {
    deleteItem(data && data._id, setItems, setLoading).then(() => {
      handleClose();
    });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div
          className="modalContainer"
          style={{ minHeight: `${height}vh`, width: `${width}vw` }}
        >
          <h4>Remove Department</h4>
          <div className="deleteContent">
            Delete department&nbsp;{data && data.name}.
            <strong> This action cannot be reversed!</strong>
          </div>
          <div className="deleteBtnContainer">
            {loading ? (
              <div className="button">Cancel</div>
            ) : (
              <div className="button" onClick={handleClose}>
                Cancel
              </div>
            )}
            {loading ? (
              <div className="button">Loading...</div>
            ) : (
              <div className="button" onClick={handleDelete}>
                Remove
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteItem;
