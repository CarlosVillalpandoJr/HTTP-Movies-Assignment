import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialValues = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const EditForm = props => {
    console.log('EditForm Props: ', props.match.params)
    
    const [ editedMovie, setEditedMovie ] = useState(initialValues)


    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setEditedMovie( res.data ))
        .catch(err => console.log(err.response));
    }, [props.match.params.id])

    console.log('Edited Movie ID: ', editedMovie.id)
    
    const handleChange = event => {
        setEditedMovie({
            ...editedMovie,
            [event.target.name]: event.target.value
        })
        console.log([event.target.name], event.target.value)
    }


    
    const handleSubmit = event => {
        console.log('Clicking')
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${editedMovie.id}`, editedMovie)
            .then(() => {
                props.history.push(`/movies/${editedMovie.id}`)
            })
            .catch(error => (error))
    }           
            

    
    return (
        <div>
            <h2>Update Form</h2>
            <form>
                <input 
                type='text'
                placeholder='Movie Title'
                name='title'
                value={editedMovie.title}
                onChange={handleChange}
                />
                <input 
                type='text'
                placeholder='Director'
                name='director'
                value={editedMovie.director}
                onChange={handleChange}
                />
                <input 
                type='number'
                placeholder='Metascore'
                name='metascore'
                value={editedMovie.metascore}
                onChange={handleChange}
                />
                <input 
                type='text'
                placeholder='Stars'
                name='stars'
                value={editedMovie.stars}
                onChange={handleChange}
                />
            </form>
            <button onClick={handleSubmit}>Submit Edit</button>
        </div>
    )
}

export default EditForm;