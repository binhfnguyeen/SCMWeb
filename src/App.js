import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import { MyUserContext } from "./configs/Context";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import { useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
const App = () => {
  let [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;