import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../service/redux-hooks";
import {Box, Button, TextField, useMediaQuery, Typography, useTheme, Input} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import * as yup from "yup";
import { Formik } from "formik";
import Dropzone, {useDropzone} from "react-dropzone";
import Flex from '../../components/Flex';
import {addUser, authRegister, userLogin} from "../../service";
import { unwrapResult } from "@reduxjs/toolkit";

interface IPicture {
    name: string
}
interface IValuesValidationRegister {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    location?: string,
    occupation?: string,
    picture?: IPicture,
}

const registrationSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email('invalid email').required("required"),
    password: yup.string().required("required")
});

const initialValuesRegister/*: IValuesValidationRegister*/ = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: Object,
};

const initialValuesLogin/*: Pick<IValuesValidationRegister, "email" | "password"> */= {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: Object,
};

export const Form = () => {
    const [file, setFile] = useState('');
    const [pageType, setPageType] = useState<string>("registration");
    const {palette} = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin: boolean = pageType === "login";
    const isRegister: boolean = pageType === "registration";
    const secondaryMediumTheme = palette.secondary.light;

    const registerHandler = async (values: any, onSubmitProps: any) => {
        try {
            const resAction = await dispatch(authRegister({
                firstName: values.firstName,
                lastName: values.lastName,
                picturePath: values.picture.name,
                occupation: values.occupation,
                email: values.email,
                password: values.password,
                location: values.location,
            }))
            unwrapResult(resAction)
            const savedUser = await resAction;
            console.log(savedUser)
            onSubmitProps.resetForm();
            if(savedUser) {
                setPageType("login");
            }

        } catch (e) {
            console.log(e)
        }
    };

    const login = async (values: any, onSubmitProps: any) => {
        try {
            const resLogin = await dispatch(userLogin({
                email: values.email,
                password: values.password,
            }))
                onSubmitProps.resetForm();
            if(resLogin) {
                dispatch(
                    addUser({
                        user: resLogin.payload.user,
                        // token: resLogin.payload.user
                    })
                );
                navigate('/home');
            }
        } catch (e) {
            console.log(e)
        }
        // const loggedInResponse = await fetch(
        //     "http://localhost:4000/auth/login",
        //     {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(values),
        //     }
        // );
        // const loggedIn = await loggedInResponse.json();
        // onSubmitProps.resetForm();
        // if(loggedIn) {
        //     dispatch(
        //         addUser({
        //             user: loggedIn.user,
        //             token: loggedIn.token
        //         })
        //     );
        //     navigate('/home');
        // }
    }
    const handleFormSubmit = async (values: any, onSubmitProps: any) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await registerHandler(values, onSubmitProps);
    };

    return (
      <Formik
          onSubmit={handleFormSubmit}
          initialValues ={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registrationSchema}
      >
          {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm
          }) => (
              <form onSubmit={handleSubmit}>
                  <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                  >
                      {isRegister && (
                          <>
                            <TextField
                                label="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                              <TextField
                                  label="Last Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.lastName}
                                  name="lastName"
                                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                  helperText={touched.lastName && errors.lastName}
                                  sx={{ gridColumn: "span 2" }}
                              />
                              <TextField
                                  label="Location"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.location}
                                  name="location"
                                  error={Boolean(touched.location) && Boolean(errors.location)}
                                  helperText={touched.location && errors.location}
                                  sx={{ gridColumn: "span 4" }}
                              />
                              <TextField
                                  label="Occupation"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.occupation}
                                  name="occupation"
                                  error={
                                      Boolean(touched.occupation) && Boolean(errors.occupation)
                                  }
                                  helperText={touched.occupation && errors.occupation}
                                  sx={{ gridColumn: "span 4" }}
                              />
                              <Box
                                  gridColumn="span 4"
                                  border={`1px solid ${secondaryMediumTheme}`}
                                  borderRadius="5px"
                                  p="1rem"
                              >
                                  {/*<Input type="file" onChange={(e: any) => setFile(e.target.files[0]) }/>*/}
                                  {/*{file ? file : 'null'}*/}
                                  <Dropzone
                                      multiple={false}
                                      onDrop={(acceptedFiles: any) => setFieldValue("picture", acceptedFiles[0])}
                                  >
                                      {({ getRootProps, getInputProps }) => (
                                          <Box
                                              {...getRootProps()}
                                              border={`2px dashed ${palette.primary.main}`}
                                              p="1rem"
                                              sx={{ "&:hover": { cursor: "pointer" } }}
                                          >
                                              <input {...getInputProps()} />
                                              {!values.picture ? (
                                                  <p>Add Picture Here</p>
                                              ) : (
                                                  <Flex>
                                                      <Typography>{values.picture.name}</Typography>
                                                      <EditOutlinedIcon />
                                                  </Flex>
                                              )}
                                          </Box>
                                      )}
                                  </Dropzone>
                              </Box>
                          </>
                      )}

                      <TextField
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={Boolean(touched.email) && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                          label="Password"
                          type="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          error={Boolean(touched.password) && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={{ gridColumn: "span 4" }}
                      />
                  </Box>

                  <Box>
                      <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.paper,
                            "&:hover": {
                                color: palette.primary.main
                            },
                        }}
                      >
                          {isLogin ? "Login" : "Registration"}
                          {/*<Navigate to='/home'/>*/}
                      </Button>
                      <Typography
                        onClick={() => {
                            setPageType(isLogin ? "registration" : "login");
                            resetForm();
                        }}
                        sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            },
                        }}
                      >
                          {isLogin ? "Don't have an account? Sign up here!" : "Already have an account? Login here!"}
                      </Typography>
                  </Box>
              </form>
          )}
      </Formik>
  )
};