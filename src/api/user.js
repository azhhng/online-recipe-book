import axios from "axios";
import { getTokenHeader } from "./tokenHeader";
const header = await getTokenHeader();

export const addUser = async (userId, userBody) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userId}`,
    userBody
  );
  console.log("Creating user...");
  return response;
};

export const editUser = async (userId, userBody) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userId}`,
    userBody,
    header
  );
  console.log("Updating user...");
  return response;
};

export const removeUser = async (userId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userId}`,
    header
  );
  console.log("Deleting user...");
  return response;
};

export const retrieveUser = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userId}`
  );
  console.log("Getting user...");
  return response;
};
