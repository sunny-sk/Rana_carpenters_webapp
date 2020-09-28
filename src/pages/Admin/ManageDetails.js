import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { getDetails, updateDetails } from "../../helper/Api";
import { Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  website: Yup.string().label("Website"),
  appShareLink: Yup.string().required().label("AppShareLink"),
});
const ManageDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    website: "",
    appShareLink: "",
  });

  const loadDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getDetails();
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        const { email, name, website, appShareLink, _id } = response.details[0];
        setId(_id);
        setData({
          ...data,
          email: email,
          name,
          website,
          appShareLink,
        });
      }
    } catch (error) {}
  };
  const onSubmitData = async (data) => {
    try {
      const { name, email, website, appShareLink } = data;
      setIsLoading(true);
      console.log(data, id);
      const response = await updateDetails(
        { name, email, website, appShareLink },
        id
      );
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        setData({
          name: response.details.name,
          website: response.details.website,
          appShareLink: response.details.appShareLink,
          email: response.details.email,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadDetails();
  }, []);

  return (
    <>
      <Menu signout={true} loggedIn={false} {...props} leftMenu={true} />
      <br />
      <div className="page">
        <div className="container">
          <br />
          {isLoading ? (
            <>
              <br />
              <div className="container text-center">
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={{
                  name: data.name,
                  email: data.email,
                  website: data.website,
                  appShareLink: data.appShareLink,
                }}
                onSubmit={onSubmitData}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              placeholder="Enter App name"
                              type="text"
                              className="form-control"
                            />
                            {errors.name && touched.name && (
                              <small
                                style={{ color: "red" }}
                                className="form-text "
                              >
                                {errors.name}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Email address</label>
                            <input
                              name="email"
                              value={values.email}
                              placeholder="Enter Email address"
                              type="email"
                              onChange={handleChange}
                              className="form-control"
                            />
                            {errors.email && touched.email && (
                              <small
                                style={{ color: "red" }}
                                className="form-text "
                              >
                                {errors.email}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              name="website"
                              onChange={handleChange}
                              value={values.website}
                              placeholder="Enter Website"
                              type="text"
                              className="form-control"
                            />
                            {errors.website && touched.website && (
                              <small
                                style={{ color: "red" }}
                                className="form-text "
                              >
                                {errors.website}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>App share Link</label>
                            <input
                              name="appShareLink"
                              onChange={handleChange}
                              value={values.appShareLink}
                              placeholder="Enter App share Link"
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm">
                        Update
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageDetails;
