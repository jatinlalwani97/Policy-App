import { Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import EditPolicyPage from "./containers/EditPolicyPage";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/edit/:policyId" component={EditPolicyPage} />
    </Switch>
  );
}

export default App;
