import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import Office from './screens/Office'
import OutGoingPackage from './screens/OutGoingPackage'
import IncomingPackage from './screens/IncomingPackage'
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3" >
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/mypage' component={Office} exact />
          <Route path='/incoming' component={IncomingPackage}  exact/>
          <Route path='/outgoing' component={OutGoingPackage}  exact/>
          <Route path='/contact' component={Contact}  exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
