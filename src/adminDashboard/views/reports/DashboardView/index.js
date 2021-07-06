import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LatestUsers from './LatestUsers';
import College from './LatestsCollege';
import TotalUsers from './TotalUsers';
import TotalDepartments from './TotalDepartments';
import Girl from './girl';
import Boy from './boy';
import Aunt from './aunt';
import Mom from './mom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ margin:"0 auto" }}
        >
         <Grid
            item
            lg={6}
            sm={6}
            xl={4}
            xs={12}
          >
            <TotalUsers />
          </Grid>  

          <Grid
            item
            lg={6}
            sm={6}
            xl={4}
            xs={12}
          >
            <TotalDepartments />
          </Grid>


          <Grid
            item
            lg={3}
            sm={6}
            xl={4}
            xs={12}
          >
            <Mom />
          </Grid>  

          <Grid
            item
            lg={3}
            sm={6}
            xl={4}
            xs={12}
          >
            <Aunt />
          </Grid>  


          <Grid
            item
            lg={3}
            sm={6}
            xl={4}
            xs={12}
          >
            <Boy />
          </Grid>  

          <Grid
            item
            lg={3}
            sm={6}
            xl={4}
            xs={12}
          >
            <Girl />
          </Grid>

          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestUsers />
          </Grid>

          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <College />
          </Grid>
        </Grid>
         
          
        </Grid>
      </Container>
      
    </Page>
  );
};

export default Dashboard;
