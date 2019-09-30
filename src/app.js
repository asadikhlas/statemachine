import React from 'react';
import Statemachines from './pages/Statemachines';
import Statemachine from './pages/Statemachine';
import NotFound from './pages/NotFound';
import ExecutionDetails from './pages/ExecutionDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DemoCard from './pages/DemoCard'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/ui">
        <Switch>
          <Route path="/" component={Statemachines} exact={true} />
          <Route path="/sm/:id" component={DemoCard} exact={true} />
          <Route path="/sm/:id/e/:eid" component={ExecutionDetails} exact={true} />
          <Route path="/sm/:id/e/:eid/state/:sid" component={ExecutionDetails} exact={true} />
          {/* <Route path="/comp" component={DemoCard} exact={true} /> */}
          <Route path="*" exact={true} component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;