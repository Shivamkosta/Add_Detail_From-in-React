import React, { useEffect, useState } from 'react';
import Common from './Common';
import { NavLink } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const ALBUM_SERVICE_URL = 'https://jsonplaceholder.typicode.com/albums';


const Albums = () => {
    const [data, setData] = useState({ album: [], isFetching: false });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({ album: data.album, isFetching: true });
                const response = await axios.get(ALBUM_SERVICE_URL);
                setData({ album: response.data, isFetching: false });
            } catch (e) {
                console.log(e);
                setData({ album: data.album, isFetching: false });
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <Common />
            <h2>ALBUM PAGE</h2>

            <NavLink class="navbar navbar-light bg-light">
            <button type="button" class="btn btn-primary">Add</button>
            </NavLink>
            <table class="table">
                <caption>List of Albums</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TITLE</th>
                    </tr>
                </thead>
                <tbody>
                    {(data.album.length > 0) ? data.album.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <button>Update</button>
                                <button>delete</button>
                            </tr>
                        )
                    }) : <tr><td colSpan="5">Loading...</td></tr>}
                </tbody>
            </table>
        </>
    )
}
export default Albums;