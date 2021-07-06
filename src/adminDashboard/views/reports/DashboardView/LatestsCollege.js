import React, { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { getDataCollege } from './connectDB/getdata';
import getInitials from '../../../../utils/getInitials';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [colleges,setColleges] = useState([]);
  const navigate = useNavigate();

  getDataCollege().then((u) =>setColleges(u));

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
      <CardHeader
        subtitle={`${colleges.length} in total`}
        title="اخر المبالغ المضافة في الشقق"
      />
      </Grid>
      <Divider />
      <List>
        {colleges.map((college, i) => (
          <ListItem
            divider={i < colleges.length - 1}
            key={college._id}
          >
             <Avatar
            className={classes.avatar}
            src={college.avatarUrl}
            >
            {getInitials(college.name)}
            </Avatar>
            <ListItemText
              style={{ "padding-left":"8px" }} 
              primary={college.name}
              secondary={college.building}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          style={{ color: '#117A65',fontWeight:700 }}
          onClick={()=>{ navigate('/app/admin/college', { replace: true }); }}
        >
          الانتقال لتفاصيل
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
