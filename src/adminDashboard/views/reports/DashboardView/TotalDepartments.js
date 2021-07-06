import React, { useState ,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { getDataDepartmentTotal } from './connectDB/getdata';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const [length, setLength] = useState(0);

  getDataDepartmentTotal().then((u) =>setLength(u.length));
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
              style={{ fontWeight:"700",fontSize:"18px" }}
            >
              مبالغ ايجارات الشقق الشهر هذا
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
              style={{ color:"green" }}
            >
              {length}$
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <HomeWorkIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
