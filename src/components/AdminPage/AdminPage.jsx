import React, { useEffect } from 'react';
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

    const deleteUser = () => {

    }

    const promoteUser = () => {

    }

    users && console.log(users);
    return (
        <div className='container'>
            {(!user.is_admin) && <h1>Not Authorized</h1>}
            {(user.is_admin) && 
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>created_at</th>
                        <th>last_online</th>
                        <th>is_admin</th>
                        <th>delete user</th>
                        <th>promote user</th>
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
                                <td><button>x</button></td>
                                <td><button>^</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            }
        </div>
    )
}