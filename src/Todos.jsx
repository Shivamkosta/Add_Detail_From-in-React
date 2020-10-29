import React, {useEffect, useState} from 'react';
import Common from './Common';
const TODO_SERVICE_URL = 'https://jsonplaceholder.typicode.com/todos'

function Todos() {
    const [data, setData] = useState([]);

    const fetchInventory = () => {
        fetch(TODO_SERVICE_URL)
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

   
    const [title, setTitle] = useState(null);

   //current title of the api
    const onEdit = ({id, currentTitle}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setTitle(currentTitle);
    }

    /**
     *
     * @param id
     * @param newUnitPrice
     */
    const updateInventory = ({id, newTitle}) => {
        fetch(`${TODO_SERVICE_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: newTitle
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

    //the newtitle of the api
    const onSave = ({id, newTitle}) => {
        updateInventory({id, newTitle});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setTitle(null);
    }

    return (
        <div className="container">
            <h2>Simple Todos Table</h2>
            <Common/>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>COMPLETE</th>
                    <th></th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.completed}</td>
                            
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={title}
                                               onChange={(event) => setTitle(event.target.value)}
                                        />
                                    ) : (item.title)
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({id: item.id, newTitle: title})}
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
                                            onClick={() => onEdit({id: item.id, currentTitle: item.title})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Todos;


// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import Common from './Common';

// const TODO_SERVICE_URL = 'https://jsonplaceholder.typicode.com/todos';

// const Todos = () => {
//     //using hooks state
//     const [data, setData] = useState({ todos: [], isFetching: false });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setData({ todos: data.todos, isFetching: true });
//                 const response = await axios.get(TODO_SERVICE_URL);
//                 setData({ todos: response.data, isFetching: false });
//             } catch (e) {
//                 console.log(e);
//                 setData({ users: data.todos, isFetching: false });
//             }
//         };
//         fetchUsers();
//     }, []);

//     return (
//         <>
//             <Common />
//             <h2>TODOS PAGE</h2>
            
//             <table class="table">
//                 <caption>List of Todos</caption>
//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">TITLE</th>
//                         <th scope="col">COMPLETE</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(data.todos.length > 0) ? data.todos.map((data, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{data.id}</td>
//                                 <td>{data.title}</td>
//                                 <td>{data.completed}</td>
//                                 <button>Update</button>
//                                 <button>delete</button>
//                             </tr>
//                         )
//                     }) : <tr><td colSpan="4">Loading...</td></tr>}
//                 </tbody>
//             </table>
//         </>
//     )
// }

// export default Todos;