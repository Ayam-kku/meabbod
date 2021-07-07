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


const AddUser = () => {
    const classes = useStyles();

  const [type, setType] = React.useState('');

    const status = useSelector((state) => state.state);
    const dispatch = useDispatch();

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
        dispatch(changeStatusOfStateToFalse());
    }

    function changeType(event) {
      setType(event.target.value);
    }


  function uploadDataToDB() {
    axios({
        method: 'post',
        url: 'https://server-me12.herokuapp.com/api/users',
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
              storetype: '',
              typePyment:'',
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
                    اضافة المبلغ
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
