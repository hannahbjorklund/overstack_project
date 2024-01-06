import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

export default function AdminPage(){
    const user = useSelector((store) => store.user.userReducer);
    const users = useSelector((store) => store.user.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        getUsers();
      }, []);

    const getUsers = () => {
        dispatch({
            type: 'GET_USERS'
        })
    }

    users && console.log(users);
    return (
        <h1>Admin Test</h1>
    )
}