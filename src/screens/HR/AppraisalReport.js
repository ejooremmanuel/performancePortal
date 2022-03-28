import axios from "axios";
import React from "react";
import "./hr.styles.css";
import ReactPaginate from "react-paginate";
import { ExportCSV } from "../../components/ExportToXLS/Export";

const AppraisalReport = () => {
  const [list, setList] = React.useState([]);
  const [exportList, setExportList] = React.useState([]);
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

  React.useEffect(() => {
    setExportList(
      list &&
        list.map((item) => {
          return [
            {
              Id: item._id,
              Status: item.status,
              Staff: item["user"]["fullname"],
              Score: item.score,
              Date: new Date(item.createdAt).toLocaleDateString(),
              Quarter: item.quarter,
              Department: item["user"]["department"],
            },
          ];
        })
    );
  }, [list]);

  function Items({ currentItems }) {
    return (
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>STAFF</th>
            <th>STAFF SCORE</th>
            <th>SESSION</th>
            <th>QUARTER</th>
            <th>STATUS</th>
            <th>DATE COMPLETED</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.user.fullname}</td>
                  <td>{item.score}</td>
                  <td>{item.session}</td>
                  <td>{item.quarter}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

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
      <div style={{ margin: "auto auto" }}>
        {exportList && (
          <ExportCSV csvData={exportList} fileName={"Appraisal Report"} />
        )}
      </div>

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

export default AppraisalReport;
