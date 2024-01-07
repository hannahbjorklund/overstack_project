import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './AdminPage.css';

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

    const deleteUser = (userID) => {
        dispatch({
            type: 'DELETE_USER',
            payload: userID
        })
    }

    const updateUser = (userID) => {
        dispatch({
            type: 'UPDATE_USER',
            payload: userID
        })
    }

    users && console.log(users);
    return (
        <div className='container'>
            {(!user.is_admin) && <h1>Not Authorized</h1>}
            {(user.is_admin) && 
            <>
            <h1>All Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>created_at</th>
                        <th>last_online</th>
                        <th>is_admin</th>
                        <th>delete user</th>
                        <th>promote/demote user</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((x) => {
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.username}</td>
                                <td>{x.created_at}</td>
                                <td>{x.last_online}</td>
                                <td>{`${x.is_admin}`}</td>
                                <td><button onClick = {() => deleteUser(x.id)} className='btn'>x</button></td>
                                {x.is_admin ? <td><button onClick = {() => updateUser(x.id)} className='btn'>demote</button></td> : 
                                <td><button onClick = {() => updateUser(x.id)} className='btn'>promote</button></td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>
            }
        </div>
    )
}