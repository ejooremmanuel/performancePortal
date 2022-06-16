import axios from "axios";
import { BASE_URL } from "../config";

//@ desc: get all items
//@ return: Promise
//@ param: setItems(func), setLoading(func)
export const getItems = async (setData, setLoading) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/departments`);
    // setData(data.results);
    setData(data.results);
    setLoading(false);
    return data;
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

//@ desc: update item
//@ return: Promise
//@ param: id(num), item(obj), setItems(func), setLoading(func)
export const updateItem = async (id, item, setItems, setLoading) => {
  try {
    await axios
      .put(`${BASE_URL}/api/v1/departments/${id}`, item, {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then(() => {
        getItems(setItems, setLoading);
      });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

//@ desc: delete item
//@ return: Promise
//@ param: id(num), setItems(func), setLoading(func)
export const deleteItem = async (id, setItems, setLoading) => {
  try {
    await axios
      .delete(`${BASE_URL}/api/v1/departments/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then(() => {
        getItems(setItems, setLoading);
      });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

//@ desc: create item
//@ return: Promise
//@ param: data(obj), setLoading(func), setItems(func)
export const createItemRequest = async (data, setLoading, setItems) => {
  try {
    await axios
      .post(`${BASE_URL}/api/v1/departments`, data, {
        headers: {
          "Content-Type": "application/json",
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((res) => {
        getItems(setItems, setLoading);
      });
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
