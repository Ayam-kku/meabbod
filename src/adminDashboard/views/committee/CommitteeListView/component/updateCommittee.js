import React, { Component, useState } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import qs from 'qs';
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

    const status = useSelector((state) => state.stateUpdate);
    const dispatch = useDispatch();

    let [committee] = React.useState({
              name: '',
              amount:'',
              status: '',
              date: '',
              year:''
  });

    function closeModal() {
        dispatch(changeStatusOfStateToFalseUpdate());
    }

    
    function uploadDataToDB() {
      axios({
          method: 'put',
          url: `/api/Committee/${props.committee._id}`,
          data: qs.stringify(committee),
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
              name: props.committee.name,
              amount: props.committee.amount,
              status: props.committee.status,
              date:props.committee.date,
              year:props.committee.year
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
                    style={{ paddingTop: "20px" }}
                    dir='rtl'
                  >
                    تحديث معلومات الايجار
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
                    حدث
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
