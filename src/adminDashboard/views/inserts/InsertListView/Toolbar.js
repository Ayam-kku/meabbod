import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusOfStateToStart,changeStatusOfSearch } from './actions/index';
import AddUser from './component/addUser';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [type, setType] = React.useState('');
  function changeType(event) {
    dispatch(changeStatusOfSearch(event.target.value));
    setType(event.target.value);
  }
  const status = useSelector((state) => state.state);
  const dispatch = useDispatch();

  const [screen, setScreen] = useState(window.matchMedia("(min-width: 800px)").matches);
  useEffect(() => {
    const handler = (e) => { console.log(e); return setScreen(e.matches); };
    window.matchMedia("(min-width: 800px)").addListener(handler);
  });

const handleClick = () => {
  dispatch(changeStatusOfStateToStart());
};
 
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
    {status === true && (<AddUser />)}
    
      <Box mt={3}>
        <Card>
          <CardContent style={{ position:'relative' }}>
            <Box 
            maxWidth={500}
            display="flex"
            justifyContent="space-between"
            flex-direction="column"
            >
            
            <FormControl variant="outlined" className={classes.formControl} style={{ margin:"0 auto", marginTop:10, width:"100%" }}>
                        <Select
                        native
                        value={type}
                        defaultValue="storetype"
                        onChange={changeType}
                        label="storetype"
                        inputProps={{
                            name: 'storetype',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                        <option value="default">حدد الشهر</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        </Select>
                    </FormControl>
              
              { screen === true ? (
              <Button
              style={{ background:"#148F77", color:'#ffffff', position: "absolute", right: "0px", marginRight:"18px", marginTop:"6px", padding:"12px" }}
              variant="contained"
              onClick={handleClick}
            >
              اضافة مبلغ
            </Button>
            ) : (
          <Button
          style={{ background:"#148F77", color:'#ffffff' }}
          variant="contained"
          onClick={handleClick}
        >
          اضافة مبلغ
        </Button>
            )}

        </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
