import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import CustomError from './CustomError';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchAwsWithErrorHandling} from '../components/AwsFetcher';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Statemachines extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetchAwsWithErrorHandling(
      "ListStateMachines",
      {
        maxResults: 1000
      },
      this,
      (result) => {
        if (result.stateMachines === undefined) {
          return "Invalid server response, missing 'stateMachines' key in ListStateMachines action output";
        }
        this.setState({
          isLoaded: true,
          items: result.stateMachines
        });
      }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <CustomError Title="Exception" Title2="Something went wrong :(" Text="Page is broken" />;
    }
    let content;
    if (!isLoaded) {
      content = <div className={this.classes.progressContainer}><CircularProgress className={this.classes.progress} /></div>;
    } else {
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      };
      content = (
        <Paper className={this.classes.root}>
          <Table className={this.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Arn</TableCell>
                <TableCell>Creation Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.stateMachineArn}>
                  <TableCell component="th" scope="row">
                    <Link to={"/sm/" + item.stateMachineArn}>{item.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={"/sm/" + item.stateMachineArn}>{item.stateMachineArn}</Link>
                  </TableCell>
                  <TableCell>{new Intl.DateTimeFormat('en-US', options).format(new Date(item.creationDate*1000))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
    return (
      <Layout Title="State Machines">
        {content}
      </Layout>
    );
  }
}

Statemachines.propTypes = {
  classes: PropTypes.object.isRequired,
};

export let Title = "Statemachines"

export default withStyles(styles)(Statemachines);