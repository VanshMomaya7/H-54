import React, { useState } from "react";
import "./Sign.css";
import AmazonLogo from "./app_logo.png";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const SignUp = () => {
  const [userData, setUserData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  console.log(userData);

  const addData = (e)=>{
    const {name, value} = e.target;

    setUserData(()=>{
      return{
        ...userData,
        [name]:value
      }
    })
  };

  const senddata = async(e)=>{
    e.preventDefault(); // This will dont load our website on click
    const {fname, email, mobile, password, cpassword} = userData;


    const res = await fetch("register",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        fname, email, mobile, password, cpassword
      })
    });

    const data = await res.json();
    // console.log(data);

    if(res.status === 422 || !data){
      // alert("Data SuccessFully Added");
      toast.warning("Invalid Details ",{
        position: "top-center",
      });
    }

    else{
      // alert("Data SuccessFully Added");
      toast.success("Data Successfully Added",{
        position: "top-center",
      });
      setUserData({...userData, fname:"", email:"", mobile:"", password:"", cpassword:""});
    }

  }

  return (
    <section>
      {/* Sign in Full Container to get the box in center */}
      <div className="sign_container">
        <div className="sign_header">
          <img src={AmazonLogo} alt="signupimg" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign Up</h1>
            <div className="form_data">
              <label htmlFor="fname">Your Name</label>
              <input
                type="text"
                value={userData.fname}
                onChange={(addData)} // at the endofCode
                name="fname"
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={userData.email}
                // onChange={addData}
                onChange={addData}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile</label>
              <input
                type="number"
                value={userData.mobile}
                onChange={addData}
                name="mobile"
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={addData}
                value={userData.password}
                placeholder="At least 6 characters"
                name="password"
                id="password"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                onChange={addData}
                value={userData.cpassword}
              />
            </div>
            <button type="submit" onClick={senddata} className="signin_btn">
              Continue
            </button>
            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Signin</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignUp;
// We wont use this method
// We have created a function addData which will do the same
// This will get the data from input & set it in fname field
// onChange={(e)=>setUserData({...userData, fname:e.target.value})}
