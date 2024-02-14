import "./App.css";
import Header from "./components/Header";
import { theme } from "./material-styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import TripScreen from "./pages/TripScreen";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen";
import TransactionScreen from "./pages/TransactionScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import UserScreenList from "./pages/UserScreenList";
import UserEditScreen from "./pages/UserEditScreen";
import TripListScreen from "./pages/TripListScreen";
import TripEditScreen from "./pages/TripEditScreen";
import OrderListScreen from "./pages/OrderListScreen";
import MainScreen from "./pages/MainScreen";
function App() {
  const [once, setOnce] = useState(false);

  useEffect(() => {
    setOnce(true);
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainScreen} />
          <ThemeProvider theme={theme}>
            <Header></Header>
            <Container>
              <Route exact path="/main" component={Home}></Route>
              <Route exact path="/page/:pageNumber" component={Home}></Route>
              <Route exact path="/trip/:id" component={TripScreen}></Route>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/login" component={LoginScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/profile" component={ProfileScreen}></Route>
              <Route path="/transaction" component={TransactionScreen}></Route>
              <Route path="/payment" component={PaymentScreen}></Route>
              <Route path="/placeorder" component={PlaceOrderScreen}></Route>
              <Route
                exact
                path="/admin/userList"
                component={UserScreenList}
              ></Route>
              <Route
                path="/admin/user/:id/edit"
                component={UserEditScreen}
              ></Route>
              <Route
                path="/admin/trip/:id/edit"
                component={TripEditScreen}
              ></Route>
              <Route path="/order/:id" component={OrderScreen}></Route>
              <Route
                path="/admin/trips"
                component={TripListScreen}
                exact
              ></Route>
              <Route
                path="/admin/trips/:pageNumber"
                component={TripListScreen}
                exact
              ></Route>
              <Route path="/admin/orders" component={OrderListScreen}></Route>
              <Route path="/search/:keyword" component={Home} exact></Route>
              <Route
                path="/search/:keyword/page/:pageNumber"
                component={Home}
              ></Route>
            </Container>
          </ThemeProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
