import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import data from "../data";
import "./Startappraisal.css";
import { Link } from "react-router-dom";

function StartAppraisal() {
  return (
    <div className="container">
      <div className="sidebarContainer2">
        <Sidebar />
      </div>
      <div className="right2">
        <div>
          <Header title="Appraisal" />
        </div>
        <div className="appraisal_container">
          <div className="start_title">
            <span>Start Appraisal</span>
          </div>
          <h4>Quarter</h4>
          <div className="select_quarter">
            <select>
              <option>Select Quarter</option>
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>

            <button className="select_btn">Start</button>
          </div>

          <div className="appraisal_table">
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Year</Th>
                  <Th>Quarter</Th>
                  <Th>Stauts</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, id) => (
                  <Tr key={id}>
                    <Td>{item.id}</Td>
                    <Td>{item.Year}</Td>
                    <Td>{item.Quarter}</Td>
                    <Td>{item.Status}</Td>
                    <Td>
                      <Link to={`/${item.id}`}>
                        <Button
                          type="button"
                          colorScheme="teal"
                          borderRadius="10"
                        >
                          Start
                          <span className=""></span>
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartAppraisal;
