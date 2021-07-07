import React, { useEffect } from 'react';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Grid,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
import { changeStatusOfStateToFalse } from '../actions/index';
import Controls from "./Controls";
import { getTotal,getTotalEx } from '../connectDB/getdata';


const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));


const AddUser = () => {
    const classes = useStyles();

    const [type, setType] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [expenses, setExpenses] = React.useState(0);
  

      useEffect(()=>{
        getTotalEx(type).then((u) =>setExpenses(u));
        getTotal(parseInt(type)).then((u) =>setValue(u));
      },[type]);
      

    const status = useSelector((state) => state.state);
    const dispatch = useDispatch();

    let [users] = React.useState({
      name: '',
      amount: '',
      date: '',
      year:'',
  });
    
    function closeModal() {
        dispatch(changeStatusOfStateToFalse());
    }

    function changeType(event) {
      setType(event.target.value);
    }


  function uploadDataToDB() {
    axios({
        method: 'post',
        url: 'https://server-me12.herokuapp.com/api/inserts/',
        data: qs.stringify(users),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
        .then((response) =>{
          alert('data added');
          closeModal();
        })
        .catch((error) =>{
            alert(`Error : + ${error.response.data.message}`);
        });
}
  

    return (
        <section>
            <Modal visible={status} width="auto" height="auto" effect="fadeInUp" onClickAway={() => closeModal()}>
                <div>
                <Container maxWidth="sm">                
          <Formik
            initialValues={{
              name: '',
              amount: '',
              date: '',
              status: '',
              year: '',
            }}
            validationSchema={
                Yup.object().shape({
                  name: Yup.string().max(255).required('اسم المحل مهم'),
                  date: Yup.string().max(255).required('تاريخ المبلغ مهم'),
                  amount: Yup.string().max(255).required('المبلغ مهم'),
                  year: Yup.string().max(255).required('السنة مهم'),
                })
              }
            onSubmit={(info) => {
                  users.name = info.name;
                  users.amount = info.amount;
                  users.date = info.date;
                  users.year = info.year;
                  
                  console.log(info);
                
                  if (users.storetype === "default") {
                    alert("حدد نوع ..")
                  }
                  else {
                  uploadDataToDB();
                  }
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
              
                <Grid container>

                  <Grid item xs={12}>
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

                    <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
>
                <Box mb={1}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    style={{ paddingTop: "20px" }}
                  >
                    المبلغ الشهري الحالي هو:<span>{value-expenses}</span>
                  </Typography>
                </Box>
                </Grid>
                  </Grid>
                  <Grid item xs={6}>
                                        <TextField
                                          error={Boolean(touched.name && errors.name)}
                                          fullWidth
                                          helperText={touched.name && errors.name}
                                          label="اسم المحل"
                                          margin="normal"
                                          name="name"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.name}
                                          variant="outlined"
                                        />


                                        <TextField
                                          error={Boolean(touched.amount && errors.amount)}
                                          fullWidth
                                          helperText={touched.amount && errors.amount}
                                          label="المبلغ"
                                          margin="normal"
                                          name="amount"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.amount}
                                          variant="outlined"
                                        />

                                        <TextField
                                          error={Boolean(touched.date && errors.date)}
                                          fullWidth
                                          helperText={touched.date && errors.date}
                                          label="شهر سداد"
                                          margin="normal"
                                          name="date"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.date}
                                          variant="outlined"
                                        />
                  </Grid>

            <Grid item xs={6} style={{ paddingTop:"6px", paddingLeft:"20px" }}>

                

                     <TextField
                                          error={Boolean(touched.year && errors.year)}
                                          fullWidth
                                          helperText={touched.year && errors.year}
                                          label="السنة"
                                          margin="normal"
                                          name="year"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.year}
                                          variant="outlined"
                                        />
                
                                               

            </Grid>    
                </Grid>
                <Box my={3}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ background: '#148F77' }}
                  >
                    اضافة
                  </Button>  
                </Box>

              </form>
            )}
            
                
                </Formik>
            </Container>
        
        </div>
            </Modal>
        </section>
    );
};



export default AddUser;
