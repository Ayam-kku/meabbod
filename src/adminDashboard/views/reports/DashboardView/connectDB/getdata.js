import axios from "axios";

async function getData() {
  const res = await axios('/api/users');
  return res.data;
}

export async function getDataUsers() {
  const res = await axios('/api/users');
  return res.data.slice(-10,res.data.length);
}

export async function getDataDepartment() {
  const res = await axios('/api/department');
  return res.data.slice(-6,res.data.length);
}

export async function getDataDepartmentTotal() {
  const res = await axios('/api/department');
  return res.data;
}

export const getDataCollegeTotal = async () => {
  const res = await axios('/api/college');
  return res.data;
}

export const getDataCollege = async () => {
  const res = await axios('/api/college');
  return res.data.slice(-5,res.data.length);
}

export async function getTotal() {
  const res = await axios('/api/users');
  let amount = 0;

  let mo = new Date().getMonth()+1;
  let year = new Date().getFullYear();

    res.data.forEach((req) => {
      if (year.toString() === req.year && mo === req.date && req.status === "سدد")
         amount +=req.amount;
    });
    console.log(amount);
          return amount;
}

export default getData;