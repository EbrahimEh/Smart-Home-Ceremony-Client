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
import PaymentFailed from "../Pages/Payment/PaymentFailed";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import Payment from "../Pages/Payment/Payment";
import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BookingDetails from "../Pages/Dashboard/BookingDetails/BookingDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'services',
                element: <Services />
            },
            {
                path: 'services/:id',
                element: <ServiceDetails />
            },
            {
                path: 'booking',
                element: <PrivateRoute><BookingForm /></PrivateRoute>
            },
            {
                path: 'booking/:serviceId',
                element: <PrivateRoute><BookingForm /></PrivateRoute>
            },
            {
                path: 'payment/:bookingId',
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
            {
                path: 'payment/success/:bookingId',
                element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
            },
            {
                path: 'payment/failed',
                element: <PrivateRoute><PaymentFailed /></PrivateRoute>
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><UserDashboard /></PrivateRoute>,
                children: [
                    {
                        index: true,
                        element: <MyBookings />
                    },
                    {
                        path: 'my-bookings',
                        element: <MyBookings></MyBookings>
                    },
                    {
                        path: 'my-bookings/:bookingId',
                        element: <BookingDetails></BookingDetails>
                    },
                    {
                        path: 'payment-history',
                        element: <PaymentHistory></PaymentHistory>
                    }
                ]
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
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
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
        ]
    }
]);