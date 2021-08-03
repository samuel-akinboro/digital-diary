import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import Diary from './components/Diary';
import Reminder from './components/Reminder';

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Diary />
            </Route>
            <Route path="/reminder">
              <Reminder />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
