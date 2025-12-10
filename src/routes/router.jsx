import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

import PrivateRoute from "./PrivateRoute";
import BookingForm from "../Pages/Services/Booking/BookingForm";
import Home from "../Pages/Home/Home/Home";
import Services from "../Pages/Services/Services/Services";
import ServiceDetails from "../Pages/Services/ServiceDetails/ServiceDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'services',
                element: <Services></Services>
            },
            {
                path: 'services/:id',
                element: <ServiceDetails></ServiceDetails>
            },
            {
                path: 'booking',
                element: (
                    <PrivateRoute>
                        <BookingForm />
                    </PrivateRoute>
                )
            },
            {
                path: 'booking/:serviceId',
                element: (
                    <PrivateRoute>
                        <BookingForm />
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
]);