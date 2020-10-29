import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';
import { Redirect, Route, Switch } from 'react-router-dom';
import Comments from './Comments';
import Albums from './Albums';
import Photos from './Photos';
import Todos from './Todos';
import Users from './Users';
import Post from './Post';



function App() {
  return (
    <>
      
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/post' component={Post} />
      <Route exact path='/comment' component={Comments} />
      <Route exact path='/album' component={Albums} />
      <Route exact path='/photo' component={Photos} />
      <Route exact path='/todo' component={Todos} />
      <Route exact path='/user' component={Users} />
      <Redirect to = '/'/>
      </Switch>
    </>
  );
}

export default App;
