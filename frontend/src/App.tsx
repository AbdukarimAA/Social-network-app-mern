import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {HomePage} from "./pages/homePage/HomePage";
import {LoginPage} from "./pages/loginPage/LoginPage";
import {ProfilePage} from "./pages/profilePage/ProfilePage";
import {useMemo} from "react";
import {useAppDispatch, useAppSelector} from "./service/redux-hooks";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./theme";
import { IsAuth } from "components/Auth";
import {addUser, setPosts} from "./service";
import axios from "axios";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/home" element={<IsAuth /> ? <HomePage /> : <Navigate to='/' />}/>
            <Route path="/profile/:id" element={<IsAuth /> ? <ProfilePage /> : <Navigate to='/' />}/>
        </Route>
    )
)
function App() {
    const [user, setUser] = useState<any>(null);
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.users.theme);
    const themeMemo = useMemo(() => createTheme(themeSettings(theme)), [theme]);


  return (
      <ThemeProvider theme={themeMemo}>
        <RouterProvider router={router} />
         <CssBaseline />
      </ThemeProvider>
  );
}

export default App;
