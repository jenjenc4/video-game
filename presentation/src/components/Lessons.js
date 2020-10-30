import React, { Component } from 'react'
import Lesson from './Lesson';
import CreateLesson from './CreateLesson'

const API_URL = process.env.REACT_APP_API_URL;

export default class extends Component {
    state = {
        lessons:[]
    }

    getlessons = () => {
        //fetch(API_URL + '/lessons')//URL (in memory) + /lessons =url/lessons
        fetch(`${API_URL}/lessons`) //URL -> URL/lessons
            .then(response=> response.json())
            .then(lessons => this.setState({lessons})) //lessons has been unpacked by line 13
    }
    componentDidMount(){
        this.getlessons();
    }
    render() {
        const displayLessons = this.state.lessons
        .map(lesson => <Lesson key={lesson._id} 
            lesson={lesson} 
            refresh={this.getLessons}/>)
        return (
            <div id="HelloThere">
                <h1>Lessons</h1>
                <CreateLesson refresh={this.getLessons}/>
                
                {displayLessons}
            </div>
        )
     }
}