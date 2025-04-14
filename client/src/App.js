import './App.css';
import Footer from './Components/Footer/Footer';
import Navbaar from './Components/header/Navbaar';
import MainComp from './Components/Home/MainComp';
// import Newnav from './Components/newnavbaar/Newnav';
import SignIn from './Components/signup_signin/SignIn';
import SignUp from './Components/signup_signin/SignUp';
import Cart from './Components/Cart/Cart';
import BuyNow from './Components/BuyNow/BuyNow';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Navbaar />
      {/* <Newnav /> */}
      <Routes>
        <Route path='/' element={<MainComp /> } />
        <Route path='/login' element={<SignIn /> } />
        <Route path='/register' element={<SignUp /> } />
        {/* id is used to show the particular product with specific ID */}
        <Route path='/getproductsone/:id' element={ <Cart /> } /> 
        <Route path='/buynow' element={ <BuyNow /> } /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
