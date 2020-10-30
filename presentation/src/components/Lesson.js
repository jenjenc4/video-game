import React, { useState } from 'react'
import UpdateLesson from './UpdateLesson';

const API_URL = process.env.REACT_APP_API_URL;

const Lesson = ({ lesson, refresh }) => {
    const[open, setOpen] = useState(false);
    const deleteLesson= () => {
        fetch(`${API_URL}/lessons/${lesson._id}`, {
            method: "DELETE"
        }) .then(refresh)
    }
    const toggleOpen = () =>setOpen(!open);
    const displayUpdate = open ? 
    <fieldset>
        <UpdateLesson lesson={lesson} refresh={refresh} close={toggleOpen} /> 

    </fieldset> :
    '' ;

        return (
            <div>
             <span>{lesson.name}</span> 
             <button className="edit" onClick={toggleOpen}>Edit</button>
             <button className="del-btned" onClick={deleteLesson}>X</button>
            {displayUpdate}
            </div>
        );
    }




export default Lesson;