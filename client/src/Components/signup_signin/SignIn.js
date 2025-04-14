import React from "react";
import AmazonLogo from "./app_logo.png";
import "./Sign.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  // We are creating a useState hook function to re-render the data
  // logData is current value & setData will be updated value of user signIn info
  // Comments added at the end
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  console.log(logdata);

  const addData = (e) => {
    // e.target will the the input element & e.target.value will get us the value of input
    // console.log(e.target.value); // testing purposes
    const { name, value } = e.target;
    setData(() => {
      return {
        // It is the spread operator
        // It will rewrite the values of logData
        ...logdata,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("Invalid Details");
      toast.warning("Invalid Details ", {
        position: "top-center",
      });
    } else {
      console.log("Data Valid");
      setData({ ...logdata, email: "", password: "" });
      toast.success("User Login", {
        position: "top-center",
      });
    }
  };

  return (
    <section>
      {/* Sign in Full Container to get the box in center */}
      <div className="sign_container">
        <div className="sign_header">
          <NavLink to="/">
            <img src={AmazonLogo} alt="signupimg" />
          </NavLink>
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign In</h1>
            <div className="form_data">
              <label htmlFor="">Email</label>
              <input
                type="text"
                onChange={addData}
                value={logdata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={addData}
                value={logdata.password}
                placeholder="At least 6 characters"
                name="password"
                id="password"
              />
            </div>
            <button type="submit" onClick={sendData} className="signin_btn">
              Continue
            </button>
          </form>
        </div>
        <div className="create_account_Info">
          <NavLink to="/register">
            <p>New to AgriShop?</p>
          </NavLink>
          <NavLink to="/register">
            <button>Create your AgriShop account</button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignIn;

//   This code sets up a state variable called logdata using the useState hook, which is an object containing two properties: email and password, both initially set to an empty string. The console.log(logdata) statement logs the current state of logdata.

// The addData function is used to update the state of logdata. It takes an event object e as its argument, which is passed when the input field triggers an onChange event. The const { name, value } = e.target destructures the name and value properties of the input field that triggered the onChange event.

// The setData function is used to update the state of logdata with the new values. It returns a new object containing all the properties of the current state of logdata, but with the name property set to the new value. This is done using the spread operator, which copies all the properties of logdata, and then overwrites the name property with the new value. The updated state is then passed back to setData, which sets the state of logdata to the new object.
