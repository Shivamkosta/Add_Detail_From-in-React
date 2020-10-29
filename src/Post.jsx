import React, {useEffect, useState} from 'react';
import Common from './Common';
const POST_SERVICE_URL = 'https://jsonplaceholder.typicode.com/posts';

function Posts() {
    const [data, setData] = useState([]);

    const fetchInventory = () => {
        fetch(POST_SERVICE_URL)
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
        fetch(`${POST_SERVICE_URL}/${id}`, {
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
            <h2>Simple Post Table</h2>
            <Common/>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>BODY</th>
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
                            <td>{item.body}</td>
                            <td></td>
                            
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

export default Posts;


// import React, { useEffect, useState } from 'react';
// import Common from './Common';
// import axios from "axios";

// const POST_SERVICE_URL = 'https://jsonplaceholder.typicode.com/posts';

// const Post = () => {
//     const [data, setData] = useState({ post: [], isFetching: false });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setData({ post: data.post, isFetching: true });
//                 const response = await axios.get(POST_SERVICE_URL);
//                 setData({ post: response.data, isFetching: false });
//             } catch (e) {
//                 console.log(e);
//                 setData({ post: data.post, isFetching: false });
//             }
//         };
//         fetchUsers();
//     }, []);
//     return (
//         <>
//             <Common />
//             <h2>POST PAGE</h2>
            
//             <table class="table">
//                 <caption>List of Posts</caption>
//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">TITLE</th>
//                         <th scope="col">BODY</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(data.post.length > 0) ? data.post.map((data, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{data.id}</td>
//                                 <td>{data.title}</td>
//                                 <td>{data.body}</td>
//                                 <button>Update</button>
//                                 <button>delete</button>
//                             </tr>
//                         )
//                     }) : <tr><td colSpan="5">Loading...</td></tr>}
//                 </tbody>
//             </table>
//         </>
//     )
// }
// export default Post;