import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signin, signup } from "../slices/authSlice";
import FileBase from "react-file-base64";
import Button from "../components/PredDefinedComponents/Button";

const register = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleAuth = () => {
    setIsSignUp((prevAuth) => !prevAuth);
  };

  const initialState = {
    firstName: "",
    lastName: "",
    selectedFile: "",
    password: "",
    phoneNumber: NaN,
  };

  const dispatch = useDispatch();

  const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp
      ? dispatch(signup(formData)).then(router.push("/"))
      : dispatch(signin(formData)).then(router.push("/"));
  };

  return (
    <div className="flex">
      <div className="w-1/2 h-screen"></div>
      <div className="w-1/2 bg-slate-200 h-screen p-2 ">
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                name="firstName"
                required
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                className="m-2"
                type="text"
                required
                onChange={handleChange}
                name="lastName"
                placeholder="Last Name"
              />
            </>
          )}
          <input
            name="phoneNumber"
            min="5000000000"
            max="9999999999"
            required
            onChange={handleChange}
            placeholder="Phone Number"
            type="number"
          />
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            placeholder="Password"
          />
          {isSignUp && (
            <>
              <input
                type="text"
                name="confirmPassword"
                required
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({ ...formData, selectedFile: base64 })
                }
                accept="image/png,image/jpeg"
              />
            </>
          )}

          <input type="submit" value={isSignUp ? "Sign Up" : "LogIn"} />
        </form>
        {isSignUp ? "Already have an account?" : "Don't have an account"}
        {isSignUp ? (
          <Button content="Sign In" onClick={toggleAuth} />
        ) : (
          <Button content="Sign Up" onClick={toggleAuth} />
        )}
      </div>
    </div>
  );
};

export default register;
