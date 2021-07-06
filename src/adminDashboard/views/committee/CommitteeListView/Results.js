import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import axios from "axios";
import Grid from '@material-ui/core/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfStateToStartUpdate } from './actions/index';
import UpdateUser from './component/updateCommittee';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  
  const status = useSelector((state) => state.stateUpdate);
  const statusForSearch = useSelector((state) => state.searchBar);
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
 
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const [committee, setCommittee] = useState();

  let total = 0;
  let totalClear = 0;

  function deleteDataFromDB(id) {
    axios({
        method: 'delete',
        url: `/api/Committee/${id}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then((response) =>{
          alert('data deleted');
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
}

  useEffect(() => {
    if (page !== 0 && statusForSearch !== "") {
      console.log('yesss');
      setPage(0);
    }
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >   
    {status === true && (<UpdateUser committee={committee} />)}
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                
              <TableCell>
                  الرقم التسلسلي
              </TableCell>

                <TableCell>
                  اسم الايجار
                </TableCell>

                <TableCell>
                  المبلغ
                </TableCell>
                
                <TableCell>
                  حاله سداد
                </TableCell>

                <TableCell>
                      شهر سداد
                </TableCell>

                <TableCell>
                  السنة
                </TableCell>

                <TableCell align="center">
                  الايجرائات
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody align="center">
              {customers.filter((users)=>{
                 if (statusForSearch === "") {
                   return true;
                 }  
                 else {
                   return users.name.includes(statusForSearch);
                 } }).slice(page * limit, page * limit + limit).map((customer,index) =>{total+=customer.amount; if(customer.status === "سدد"){ totalClear+=customer.amount;} return(
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    {customer.name}
                  </TableCell>

                  <TableCell>
                   {customer.amount}
                </TableCell>

                  <TableCell>
                  {customer.status === 'لم يسدد' ? (
                        <Chip
                        style={{ background:'#C43F3F',color:'white' }}
                        label={customer.status}
                        size="small"
                      />
                    ) : (
                      <Chip
                      style={{ background:'#1E8449',color:'white' }}
                      label={customer.status}
                      size="small"
                    />
                      
                    )}
                  </TableCell>

                  <TableCell>
                    {customer.date}
                  </TableCell>

                  <TableCell>
                    {customer.year}
                  </TableCell>

                  <TableCell align="center">
                  <IconButton 
                  onClick={() => {
                  setCommittee(customer);
                  dispatch(changeStatusOfStateToStartUpdate());
                  }}
                  style={{ color:"#F1C40F" }} 
                  className={classes.button} 
                  aria-label="Update">
                      <UpdateIcon />
                    </IconButton>

                    <IconButton 
                    onClick={() => {
                      if (window.confirm('متاكد تبي تحذف الايجار ؟')) {
                        deleteDataFromDB(customer._id);
                      }
                    }} 
                    color="secondary" 
                    style={{ color:"#C43F3F" }} 
                    className={classes.button} 
                    aria-label="Delete">
                      <DeleteIcon />
                    </IconButton> 

                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
                <Box style={{ padding:"10px" }}>
                      جميع المبالغ في الشهر المذكور اعلاه هو: <span style={{ fontSize:"15px" }}>({total-totalClear})</span><span style={{ color:"#D35400",fontSize:"18px" }}>${0}</span>
                </Box>

                <Box style={{ padding:"10px" }}>
                      جميع المبالغ في الشهر المذكور اعلاه <span style={{ fontWeight:"700" }}>(مسدده)</span> هو: <span style={{ color:"green",fontSize:"18px" }}>${totalClear} </span>
                </Box>
</Grid>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 50]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
