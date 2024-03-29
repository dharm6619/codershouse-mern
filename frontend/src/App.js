import Home from './pages/Home/Home';
// import Register from './pages/Register/Register';
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import './App.css';
// import Login from './pages/Authenticate/Login/Login';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
const isAuth = false;
const user = {
  activated: false,
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path='/' element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }  />
          <Route
            path="/Authenticate"
            element={
              <GuestRoute>
                <Authenticate />
              </GuestRoute>
            }
          />
          <Route
            path="/Activate/*"
            element={
              <SemiProtectedRoute>
                <Activate />
              </SemiProtectedRoute>
            }
          />

          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />

          {/* <Route path='/register' element={<Register />} exact ></Route>
          <Route path='/login' element={<Login />} exact ></Route> */ }
        </Routes>
      </BrowserRouter>
    </div>
  );
}


// This way we can ensure all the check and balanced we want our component to have before rendering.
const GuestRoute = ({ children, ...rest }) => {
  return ({ ...rest }, isAuth ? (
    <Navigate to={{
      pathname: '/rooms',

    }} />
  ) :
    (
      children
    ))
}

const SemiProtectedRoute = ({ children, ...rest }) => {

  return (
    { ...rest },
    !isAuth ? (
      <Navigate to={{
        pathname: '/',
      }} />
    ) : isAuth && !user.activated ? (children) : <Navigate to={{
      pathname: '/Activate',

    }} />)
}

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    { ...rest },
    !isAuth ? (
      <Navigate to={{
        pathname: '/',
      }} />
    ) : isAuth && !user.activated ?
      (
        <Navigate to={{
          pathname: '/activate',
        }} />
      ) :
      (children)
  )
}




export default App;

// Note-1: in line 8, the Switch tag is replaced with the Routes tag with the new react update. 
// Note-2: The Home component is declared with the element tag within the Route tag with the new react update.  

{/* <Routes 
      {...rest}
      render = {({ location }) =>{
        
        return isAuth ? (<Navigate to={{
          pathname: '/rooms', 
          state: {from: location}
        }} />
        ):
        (
          {children}
        )
      }}
    /> */}

/* const SemiProtectedRoute = ({ children, ...rest }) => {
  return <Routes {...rest} render={({ location }) => {
    return (
      !isAuth ? (
        <Navigate to={{
          pathname: '/',
          state: { from: location }
        }} />
      ) : isAuth && !user.activated ? (children) : <Navigate to={{
        pathname: '/rooms',
        state: { from: location }
      }} />
    )
  }}>

  </Routes>
}*/