import React, { useState, useEffect } from 'react';
import logger from 'redux-logger';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import Page from 'src/components/Page';
import thunk from 'redux-thunk'; 
import { createStore,applyMiddleware,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import closeReducer from './reducers/closepopup';
import closeReducerUpdate from './reducers/closePopupUpdate';
import statusofSearch from './reducers/statusofSearch';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './connectDB/getdata';
import PageHeader from './component/PageHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


//now here we create store to change the status of popup
const allreducer = combineReducers({
    state: closeReducer,
    stateUpdate:closeReducerUpdate,
    searchBar: statusofSearch 
});


const store = createStore(allreducer,applyMiddleware(thunk));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers, setusers] = useState([]);

  
    data().then((u) =>setusers(u));
    console.log(customers);

  return (
    <Provider store={store}>
    <Page
      className={classes.root}
      title="متاجر الحبيل"
    >
      <Container maxWidth={false}>
        <PageHeader title='ايجارات الحبيل' subtitle='قائمة جميع الايجارات' icon={<StoreIcon fontSize="large" />} />
        <Toolbar />
        <Box mt={3}>
         <Results customers={customers} /> 
        </Box>
      </Container>
    </Page>
    </Provider>
  );
};

export default CustomerListView;
