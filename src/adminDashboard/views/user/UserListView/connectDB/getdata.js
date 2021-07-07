import axios from "axios";

export const getData = async () => {
  const res = await axios('https://server-me12.herokuapp.com/api/users');
  return res.data;
}

export const getDataCollege = async () => {
  const res = await axios('https://server-me12.herokuapp.com/api/college');
  return res.data;
}



export default getData;
