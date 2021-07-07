import axios from "axios";

export const getData = async () => {
  const res = await axios('https://server-me12.herokuapp.com/api/inserts/');
  return res.data;
}

export async function getTotal(mo) {
  const res = await axios('https://server-me12.herokuapp.com/api/users');
  let amount = 0;

  let year = new Date().getFullYear();

    res.data.forEach((req) => {
      if (year.toString() === req.year && mo === req.date && req.status === "سدد")
         amount +=req.amount;
    });
          return amount;
}

export async function getTotalEx(mo) {
  const res = await axios('https://server-me12.herokuapp.com/api/inserts');
  let amount = 0;

  let year = new Date().getFullYear();

    res.data.forEach((req) => {
      console.log(req);
      if (year.toString() === req.year && mo === req.date)
         amount +=req.amount;
    });
          return amount;
}

export const getDataCollege = async () => {
  const res = await axios('https://server-me12.herokuapp.com/api/college');
  return res.data;
}



export default getData;
