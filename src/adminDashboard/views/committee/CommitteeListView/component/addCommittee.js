import React, { Component, useState } from 'react';
import Modal from 'react-awesome-modal';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
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
import axios from "axios";
import qs from 'qs';
import { changeStatusOfStateToFalse } from '../actions/index';
import Controls from "./Controls";

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


const AddCommittee = () => {
    const classes = useStyles();
  
    const status = useSelector((state) => state.state);
    const dispatch = useDispatch();

    let [committee] = React.useState({
      name: '',
      amount:'',
      status: '',
      date: '',
      year:''
  });
    
    function closeModal() {
        dispatch(changeStatusOfStateToFalse());
    }

    
    function uploadDataToDB() {
      axios({
          method: 'post',
          url: 'https://server-me12.herokuapp.com/api/Committee',
          data: qs.stringify(committee),
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
              amount:'',
              status: '',
              date: '',
              year:''
            }}
            validationSchema={
                Yup.object().shape({
                  name: Yup.string().max(255).required('الاسم مهم'),
                  year: Yup.string().max(255).required('الشهر مهم'),
                  date: Yup.string().max(255).required('التاريخ مهم'),
                  amount: Yup.string().max(255).required('المبلغ مهم'),
                })
              }
            onSubmit={(info) => {
                  committee.name = info.name;
                  committee.status = info.status;
                  committee.date = info.date;
                  committee.year = info.year;
                  committee.amount = info.amount;
                  
                  uploadDataToDB();      
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

                <Box mb={1}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    dir="rtl"
                    style={{ paddingTop: "20px" }}
                  >
                    اضافات الايجار
                  </Typography>
                </Box>

                <Grid container>  
                  <Grid item xs={12}>
                                        <TextField
                                          error={Boolean(touched.name && errors.name)}
                                          fullWidth
                                          helperText={touched.name && errors.name}
                                          label="اضف وصف الايجار"
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
                                          label="اضف المبلغ الايجار"
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
                                          label="الشهر"
                                          margin="normal"
                                          name="date"
                                          required
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                          value={values.date}
                                          variant="outlined"
                                        />
                                      

                                        <TextField
                                          error={Boolean(touched.task && errors.task)}
                                          fullWidth
                                          helperText={touched.task && errors.task}
                                          label="السنة"
                                          margin="normal"
                                          name="year"
                                          type="year"
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
                    style={{ background: '#F1C40F' }}
                  >
                    أضف الايجار
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



export default AddCommittee;
