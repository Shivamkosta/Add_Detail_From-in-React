import React from 'react';
import { NavLink } from 'react-router-dom';

const Common = ()=>{
    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">DEMO API</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                    <li class="nav-item active">
                    <NavLink className="nav-link" exact to="/">HOME <span class="sr-only">(current)</span></NavLink>
                    </li>
                    <li class="nav-item active">
                    <NavLink className="nav-link" exact to="/post">POST</NavLink>
                    </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/comment">COMMENTS</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/album">ALBUMS</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/photo">PHOTOS</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/todo">TODOS</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/user">USERS</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    
        </>
    )
}
export default Common;