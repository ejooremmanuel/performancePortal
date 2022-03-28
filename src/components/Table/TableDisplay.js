import React from "react";
import "../../screens/HR/hr.styles.css";
import ReactPaginate from "react-paginate";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const TableDisplay = ({ itemsPerPage, list, setList }) => {
  const onDelete = (id) => {
    const check = window.confirm(`Are you sure you want to delete this item?`);
    if (check) {
      axios.delete(`/api/v1/initiative/${id}`).then((response) => {
        setList(list.filter((item) => item._id !== id));
      });
    }
  };

  function Items({ currentItems }) {
    return list.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>PERSPECTIVE</th>
            <th>OBJECTIVES</th>
            <th>MEASURES</th>
            <th>TARGETS</th>
            <th>INITIATIVES</th>
            <th>SESSION</th>
            <th>DATE ADDED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.perspective.title}</td>
                  <td>{item.objective}</td>
                  <td>{item.measures}</td>
                  <td>{item.target}</td>
                  <td>{item.initiative}</td>
                  <td>{item.session}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        onDelete(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    ) : (
      <div style={{ width: "80%", height: "200px", textAlign: "center" }}>
        <h4>You have not set any initiative</h4>
        <span>
          Click <strong>Set initiative</strong> to get started.
        </span>
      </div>
    );
  }

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 5;
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, list]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={"paginate"}>
        <Items currentItems={currentItems} />
        <ReactPaginate
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default TableDisplay;
