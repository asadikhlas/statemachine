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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import {fetchAwsWithErrorHandling} from '../components/AwsFetcher';
import Checkbox from '@material-ui/core/Checkbox';

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
  chip: {
    margin: theme.spacing.unit,
  },
});

class DemoCard extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      stateMachine:{},
      checkedA: true
    };
  }



   handleChange =event => {
     this.setState({checkedA: event.target.value})
  };

  componentDidMount() {
    let stateMachine = {};
    fetchAwsWithErrorHandling(
      "DescribeStateMachine",
      {
        stateMachineArn: this.props.match.params['id']
      },
      this,
      (result) => {
        if (result.name === undefined) {
          return "Invalid server response, missing 'name' key in DescribeStateMachine action output";
        }
        stateMachine = result;
        fetchAwsWithErrorHandling(
          "ListExecutions",
          {
            maxResults: 1000,
            stateMachineArn: this.props.match.params['id']
          },
          this,
          (result) => {
            if (!result.executions) {
              return "Invalid server response, missing 'executions' key in ListExecutions action output";
            }
            this.setState({
              isLoaded: true,
              items: result.executions,
              stateMachine: stateMachine
            });
          }
        )
      }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <CustomError Title="Exception" Title2="Sometheing went wrong :(" Text={error} />;
    }

    let content;
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    };
    if (!isLoaded) {
      content = <div className={this.classes.progressContainer}><CircularProgress className={this.classes.progress} /></div>;
    } else {
      content = (
        <Paper className={this.classes.root}>
          <Table className={this.classes.table}>
            <TableHead>
              <TableRow>
              <TableCell></TableCell>

                <TableCell>State machines</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Running</TableCell>
                <TableCell>Succeeded</TableCell>
                <TableCell>Failed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, key) => (
                <>
                <TableRow key={item.executionArn + key}>
                  <TableCell component="th" scope="row">
                  <Checkbox
        checked={this.state.checkedA}
        onChange={this.handleChange}
        value="checkedA"
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
                  {/* step-test */}
                    {/* <Link to={"/sm/" + item.stateMachineArn + "/e/" + item.executionArn}>{item.executionArn}</Link> */}
                  </TableCell>
          
                  <TableCell  key={item.executionArn + key} >
                  step-test
                    {/* <Link to={"/sm/" + item.stateMachineArn + "/e/" + item.executionArn}>{item.executionArn}</Link> */}
                  </TableCell>
                  <TableCell>
                  {
                      item.stopDate >= item.startDate ? new Intl.DateTimeFormat('en-US', options).format(new Date(item.stopDate * 1000)) : "--"
                    }
                    {/* <Link to={"/sm/" + item.stateMachineArn + "/e/" + item.executionArn}>{item.name}</Link> */}
                  </TableCell>
                  <TableCell>
                    <div className={this.classes.root}>
                      <Chip label={item.status} className={this.classes.chip} color={item.status === "SUCCEEDED" ? "primary": "secondary"} />
                    </div>
                  </TableCell>
                  <TableCell>
                    0
                  </TableCell>
                  <TableCell>
                    {
                      item.stopDate >= item.startDate ? new Intl.DateTimeFormat('en-US', options).format(new Date(item.stopDate * 1000)) : "--"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      item.stopDate >= item.startDate ? new Intl.DateTimeFormat('en-US', options).format(new Date(item.stopDate * 1000)) : "--"
                    }
                  </TableCell>
                  
                </TableRow>
                <TableRow key={item.executionArn + key}>
                  <TableCell component="th" scope="row">
                  <Checkbox
        checked={this.state.checkedA}
        onChange={this.handleChange}
        value="checkedA"
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
                  {/* step-test */}
                    {/* <Link to={"/sm/" + item.stateMachineArn + "/e/" + item.executionArn}>{item.executionArn}</Link> */}
                  </TableCell>
          
                  <TableCell  key={item.executionArn + key} >
                  step-test
                    {/* <Link to={"/sm/" + item.stateMachineArn + "/e/" + item.executionArn}>{item.executionArn}</Link> */}
                  </TableCell>
                  <TableCell>
                  {
                      item.stopDate >= item.startDate ? new Intl.DateTimeFormat('en-US', options).format(new Date(item.stopDate * 1000)) : "--"
                    }
                    {/* <Link to={"/sm/" + item.stateMachineArn + "/e/" + item.executionArn}>{item.name}</Link> */}
                  </TableCell>
                  <TableCell>
                    <div className={this.classes.root}>
                      <Chip label={"ACTIVE"} className={this.classes.chip} color={!item.status === "SUCCEEDED" ? "secondary": "primary"} />
                    </div>
                  </TableCell>
                  <TableCell>
                    0
                  </TableCell>
                  <TableCell>
                    {
                      item.stopDate >= item.startDate ? new Intl.DateTimeFormat('en-US', options).format(new Date(item.stopDate * 1000)) : "--"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      item.stopDate >= item.startDate ? new Intl.DateTimeFormat('en-US', options).format(new Date(item.stopDate * 1000)) : "--"
                    }
                  </TableCell>
                  
                </TableRow>
                </>
                
              ))}
            </TableBody>
          </Table>
          <Card>
            <CardActions>
              <Button size="small" color="primary" component={Link} to="/">
                Back
              </Button>
            </CardActions>
          </Card>
        </Paper>
      );
    }

    return (
      <Layout Title={"State Machine > State Machines(4)"}>
        {content}
        
      </Layout>
    );
  }
}

DemoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemoCard);
