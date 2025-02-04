import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
    forgotPass: false,
    email: "",
    otp_sent: false,
    otp_verified: false,
    otp: "",
    otp_error: "",
    otp_loading: false,
    password: "",
    password_error: "",
};

const forgotPassSlice = createSlice({
    name: "forgotPass",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setForgotPass: (state, action) => {
            state.forgotPass = action.payload;
        },
        setOtpSent: (state, action) => {
            state.otp_sent = action.payload;
        },
        setOtpVerified: (state, action) => {
            state.otp_verified = action.payload;
        },
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
        setOtpError: (state, action) => {
            state.otp_error = action.payload;
        },
        setOtpLoading: (state, action) => {
            state.otp_loading = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPasswordError: (state, action) => {
            state.password_error = action.payload;
        },
    },
});

export const {
    setEmail,
    setForgotPass,
    setOtpSent,
    setOtpVerified,
    setOtp,
    setOtpError,
    setOtpLoading,
    setPassword,
    setPasswordError,
} = forgotPassSlice.actions;

export default forgotPassSlice.reducer;