import React from "react";
import "../../screens/HR/hr.styles.css";
import ReactPaginate from "react-paginate";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const StaffScoreTable = ({ itemsPerPage, list }) => {
  const navigate = useNavigate();
  const onGetUserScore = (id, name) => {
    navigate(`/manager/rating/${name}/${id}`);
  };

  function Items({ currentItems }) {
    return list.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Staff</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.fullname}</td>
                  <td>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        onGetUserScore(item._id, item.fullname);
                      }}
                    >
                      View Staff Rating
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    ) : (
      <div style={{ width: "80%", height: "200px", textAlign: "center" }}>
        <h4>No staff found!</h4>
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

export default StaffScoreTable;
