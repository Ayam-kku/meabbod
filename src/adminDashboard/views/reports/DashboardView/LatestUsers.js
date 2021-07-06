import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getDataUsers } from './connectDB/getdata';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  getDataUsers().then((u) =>setUsers(u));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
>
      <CardHeader title="اخر المبالغ المضافة في الحبيل" />
      </Grid>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell>
                  الرقم تسلسلي
                </TableCell>
                
                <TableCell>
                  اسم المحل
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
                النوع
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* هنا عدل  */}
              {users.map((order,index) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {order.name}
                  </TableCell>
                  <TableCell>
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    {order.status === 'لم يسدد' ? (
                        <Chip
                        style={{ background:'#C43F3F',color:'white' }}
                        label={order.status}
                        size="small"
                      />
                    ) : (
                      <Chip
                      style={{ background:'#1E8449',color:'white' }}
                      label={order.status}
                      size="small"
                    />
                      
                    )}
                  
                  </TableCell>

                  <TableCell>
                    {order.date}
                  </TableCell>

                  <TableCell>
                    {order.storetype}
                  </TableCell>
                </TableRow>
                
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          style={{ color: '#117A65',fontWeight:700 }}
          onClick={()=>{ navigate('/app/admin/users', { replace: true }); }}
        >
          الانتقال لتفاصيل
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
