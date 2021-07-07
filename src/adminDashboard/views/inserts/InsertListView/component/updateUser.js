import React, { Component, useState,useEffect } from 'react';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
import { getDataCollege } from '../connectDB/getdata';
import Controls from "./Controls";
import { changeStatusOfStateToFalseUpdate } from '../actions/index';

const userTypeEliment = [
  { id:'سدد', title:'سدد' },
  { id:'لم يسدد', title:'لم يسدد' },
]

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


const UpdateUser = (props) => {
    const classes = useStyles();
    const [type, setType] = React.useState(props.user.storetype);
    const status = useSelector((state) => state.stateUpdate);
    const dispatch = useDispatch();
    
    let [colleges,setColleges] = React.useState([]);
    useEffect(()=>{
      getDataCollege().then((u) =>{ setColleges(u); });
    },[]);

    let [users] = React.useState({
      name: '',
      amount: '',
      date: '',
      status: '',
      year:'',
      storetype: '',
      typePyment:''
  });

    function closeModal() {
        dispatch(changeStatusOfStateToFalseUpdate());
    }

    function changeType(event) {
      setType(event.target.value);
    }
    
    function uploadDataToDB() {
      axios({
          method: 'put',
          url: `https://server-me12.herokuapp.com/api/inserts/${props.user._id}`,
          data: qs.stringify(users),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
          .then((response) =>{
            alert('data updated');
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
              name: props.user.name,
              date: props.user.date,
              amount: props.user.amount,
              year: props.user.year,
              status:props.user.status,
              typePyment: props.user.typePyment
            }}
            validationSchema={
                Yup.object().shape({
                  name: Yup.string().max(255).required('اسم المحل مهم'),
                  date: Yup.string().max(255).required('تاريخ المبلغ مهم'),
                  amount: Yup.string().max(255).required('المبلغ مهم'),
                  year: Yup.string().max(255).required('السنة مهم'),
                  typePyment:Yup.string().max(255).required('نوع السداد مهم'),
                })
              }
            onSubmit={(info) => {
                  users.name = info.name;
                  users.amount = info.amount;
                  users.storetype = type;
                  users.date = info.date;
                  users.status = info.status;
                  users.year = info.year;
                  users.typePyment = info.typePyment;
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
                    تعديل المبلغ
                  </Typography>
                </Box>
                </Grid>
                <Grid container>  
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

                                          <Controls.RadioGroup
                                                label="حاله سداد:"
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                items={userTypeEliment}
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
                        <option value="default">حدد نوع المحل</option>
                        <option value="محلات عامة">محلات عامة</option>
                        <option value="غرف">غرف</option>
                        <option value="بقالة">بقالة</option>
                        <option value="مستوصف">مستوصف</option>
                        <option value="ورشة">ورشة</option>
                        </Select>
                    </FormControl>


                    <TextField
                                          error={Boolean(touched.typePyment && errors.typePyment)}
                                          fullWidth
                                          helperText={touched.typePyment && errors.typePyment}
                                          label="نوع السداد"
                                          margin="normal"
                                          name="typePyment"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.typePyment}
                                          variant="outlined"
                                        />  

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
                    style={{ background: '#566573' }}
                  >
                    تعديل
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

export default UpdateUser;
