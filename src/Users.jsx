import React, {useEffect, useState} from 'react';
import Common from './Common';
import axios from "axios";
import ModalButton from './ModalButton';
//import AddForm from './AddForm';
const USER_API_URL = 'https://jsonplaceholder.typicode.com/users';

function Users() {
    const [data, setData] = useState([]);

    const fetchInventory = () => {
        fetch(USER_API_URL)
            .then(res => res.json())
            .then(json => setData(json));
    }

    useEffect(() => {
        fetchInventory();
    }, []);


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

  
    const [name, setName] = useState(null);

    //remove data
    const removeData = (id) => {
        let url = `https://jsonplaceholder.typicode.com/users/${id}`
        console.log()
        axios.delete(url).then(res => {
            const del = data.filter(item => id !== item.id)
            setData(del)
            console.log('res', res)
        })
    }
    
    //update data
    const onEdit = ({id, currentName}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setName(currentName);
    }

   
    const updateInventory = ({id, newName}) => {
        fetch(`${USER_API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                fetchInventory();
            })
    }

    const onSave = ({id, newName}) => {
        updateInventory({id, newName});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setName(null);
    }

   

    return (
        <div className="container">

            <h2>Simple User Table</h2>
            <Common/>
            <ModalButton/>
    {/* <button type="button" onClick={()=>Addbutton()} class="btn btn-primary">Add</button> */}
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={name}
                                               onChange={(event) => setName(event.target.value)}
                                        />
                                    ) : (
                                        item.name
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({id: item.id, newName: name})}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({id: item.id, currentName: item.name})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td>
                            <td className='opration'>
                                <button onClick={() => removeData()}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            
        </div>
    );
}

export default Users;



// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import Common from './Common';
// import UserDelete from './UserDelete'


// //import SimpleUserTable from './SimpleUserTable';
// const USER_SERVICE_URL = 'https://jsonplaceholder.typicode.com/users';

// const Users = () => {
//     // using hooks state
//     const [data, setData] = useState({ users: [], isFetching: false });
//     //edit user
//     const [inEditUser,setinEdit] = useState({
//         status : false,
//         rowkey :null
//     });

//     cons onEdit = ({id,currentData})=>{
//         setinEdit({
//             status : true,
//             rowkey :id
//         })
//         setData(currentData)
//     }
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setData({ users: data.users, isFetching: true });
//                 const response = await axios.get(USER_SERVICE_URL);
//                 setData({ users: response.data, isFetching: false });
//                 console.log(data)
//             } catch (e) {
//                 console.log(e);
//                 setData({ users: data.users, isFetching: false });
//             }
//         };
//         fetchUsers();
//     }, []);

//     //delete table data
//     const deleteItems = (id)=>{
//         setData((users)=>{
//             return users.filter((arritem,index)=>{
//             return index !== id;
//             })
//         })
//         console.log('deleted')
//     }
//     return (
//         <>
//             <Common />
//             <h2>User PAGE</h2>
//             <table class="table">
//                 <caption>List of Users</caption>

//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">NAME</th>
//                         <th scope="col">USERNAME</th>
//                         <th scope="col">EMAIL</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(data.users.length > 0) ? data.users.map((data, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{data.id} </td>
//                                 <td>{data.name}  </td>
//                                 <td>{data.username}  </td>
//                                 <td>{data.email} </td>
//                                 <UserDelete
//                                     key={index}
//                                     id={index}
//                                     text={data.index}
//                                     onSelect={deleteItems}
//                                     />
//                                 <button onClick="update()" >Update</button>
//                             </tr>
//                         )
//                     }) : <tr><td colSpan="5">Loading...</td></tr>}
//                 </tbody>
//             </table>
//         </>
//     )
// }
// export default Users;