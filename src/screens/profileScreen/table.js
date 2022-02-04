import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../component/data';
import Header from '../../component/header_';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import PictureBar from '../../component/pictureBar_';
import styles from "./styles.module.css"

const StaffTable = () => {
   const {firstName,middleName,lastName,email,gender,mobile,position,department,cugNumber,manager,location} = data
   console.log(data) 
  return <div >
        <div> 
            <Header pageName="Staffs Info"/>
                    <div className={styles.tableContainer}>
                    <Table size='sm' variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>FirstName</Th>
                      <Th>LastName</Th>
                      <Th>Email</Th>
                      <Th>Gender</Th>
                      <Th>Mobile</Th>
                      <Th>CUG Number</Th>
                      <Th>Position</Th>
                      <Th>department</Th>
                      <Th>Manager</Th>
                      <Th>location</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((item) => (
                      <Tr>
                        <Td>{item.firstName}</Td>
                        <Td>{item.lastName}</Td>
                        <Td>{item.email}</Td>
                        <Td>{item.gender}</Td>
                        <Td>{item.mobile}</Td>
                        <Td>{item.cugNumber}</Td>
                        <Td>{item.position}</Td>
                        <Td>{item.department}</Td>
                        <Td>{item.manager}</Td>
                        <Td>{item.location}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                    </Table>
                    </div>
            </div>
        </div>
};

export default StaffTable;