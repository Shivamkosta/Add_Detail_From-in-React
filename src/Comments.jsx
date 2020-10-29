import React,{useState,useEffect} from 'react';
import Common from './Common';
import axios from "axios";

const COMMENT_SERVICE_URL = 'https://jsonplaceholder.typicode.com/comments';

const Comments = () => {
    
    const [data, setData] = useState({ comment: [], isFetching: false });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({ comment: data.comment, isFetching: true });
                const response = await axios.get(COMMENT_SERVICE_URL);
                setData({ comment: response.data, isFetching: false });
            } catch (e) {
                console.log(e);
                setData({ comment: data.comment, isFetching: false });
            }
        };
        fetchUsers();
    }, []);
    return (
        <>
            <Common />
            <h2>COMMENTS PAGE</h2>

          
            <table class="table">
                <caption>List of Comments</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">NAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">BODY</th>
                    </tr>
                </thead>
                <tbody>
                    {(data.comment.length > 0) ? data.comment.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.body}</td>
                                <div>
                                <button type="button" class="btn btn-primary btn-sm">Update</button>
                                <button type="button" class="btn btn-secondary btn-sm">delete</button>
                                </div>
                            </tr>
                        )
                    }) : <tr><td colSpan="5">Loading...</td></tr>}
                </tbody>
            </table>
        </>
    )
}
export default Comments;