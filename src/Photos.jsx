import React, {useEffect, useState} from 'react';
import Common from './Common';
const PHOTO_SERVICE_URL = 'https://jsonplaceholder.typicode.com/photos';

function Photo() {
    const [data, setData] = useState([]);

    const fetchInventory = () => {
        fetch(PHOTO_SERVICE_URL)
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
        fetch(`${PHOTO_SERVICE_URL}/${id}`, {
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
                      <th>URL</th>
                      <th>THUMBNAIL URL</th>
                      <th></th>
                      <th>ACTION</th>

                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.url}</td>
                            <td>{item.thubmnails}</td>
                            
                            
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

export default Photo;


// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import Common from './Common';

// const PHOTO_SERVICE_URL = 'https://jsonplaceholder.typicode.com/photos';


// const Photos = () => {

//     const [data, setData] = useState({ photos: [], isFetching: false });

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setData({ photos: data.photos, isFetching: true });
//                 const response = await axios.get(PHOTO_SERVICE_URL);
//                 setData({ photos: response.data, isFetching: false });
//             } catch (e) {
//                 console.log(e);
//                 setData({ photos: data.photos, isFetching: false });
//             }
//         };
//         fetchUsers();
//     }, []);

//     return (
//         <>
//             <Common />
//             <h2>PHOTOS PAGE</h2>
           
//             <table class="table">
//                 <caption>List of Photos</caption>
//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">TITLE</th>
//                         <th scope="col">URL</th>
//                         <th scope="col">THUMBNAIL URL</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {(data.photos.length > 0) ? data.photos.map((data, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{data.id}</td>
//                                 <td>{data.title}</td>
//                                 <td>{data.url}</td>
//                                 <td>{data.thumbnailUrl}</td>
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
// export default Photos;