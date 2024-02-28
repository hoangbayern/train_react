import Test from './components/Test';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/layouts/Header';
import Login from './components/authenticate/Login';
import Register from './components/authenticate/Register';
import ListUser from './components/user-manage/ListUser';
import Test1 from './components/Learn/Test1';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Test />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/user/list" element={<ListUser />} />
        <Route exact path="/learn/test1" element={<Test1 />} />
      </Routes>
    </Router>
  );
}

export default App;
