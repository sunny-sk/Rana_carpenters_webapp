import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { loginAdmin, authenticate } from "../../helper/Api";
import { NavLink } from "react-router-dom";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
const AdminLogin = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitData = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const response = await loginAdmin({ email, password });
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        authenticate(response.user, () => {
          props.history.replace("/dashboard/admin");
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="page">
        <div className="container">
          <div className="text-center mb-3">
            <p className="lead">Admin Login</p>
          </div>
          <div className="text-left">
            <NavLink to="/">
              <p> back to home</p>
            </NavLink>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmitData}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      placeholder="abc@gmail.com"
                      name="email"
                      autoComplete="none"
                      onChange={handleChange}
                      className="form-control"
                      value={values.email}
                    />
                    <small className="form-text text-muted">
                      Please ensure it's admin email address
                    </small>
                    {errors.email && touched.email && (
                      <small style={{ color: "red" }} className="form-text ">
                        {errors.email}
                      </small>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      placeholder="****"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      className="form-control"
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <small style={{ color: "red" }} className="form-text ">
                        {errors.password}
                      </small>
                    )}
                  </div>

                  {isLoading ? (
                    <>
                      <div className="text-center">
                        <p className="lead">Please wait</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </>
                  )}
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
