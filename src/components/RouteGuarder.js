import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const RouteGuarder = ({ component: Component, ...others }) => {
    const { currentUser } = useAuth()

    return (
        <Route
            {...others}
            render={props => {
                return currentUser ? <Component {...props} /> : <Navigate to="/login" />
            }}
        ></Route>
    )
}

export default RouteGuarder