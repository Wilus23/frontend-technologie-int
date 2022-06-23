import React, { useState, useEffect } from "react";
import {Input} from 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Axios from 'axios';
// import Loging from "./Loging";
// import { BrowserRouter } from "react-router-dom";
import LogingForm from "./LogingForm";

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([])
  
  const [newReview, setNewReview] = useState('');

  // LOGOWANIE
  const adminUser ={
    email: "admin@admin.pl",
    password: "admin123"
  }
  
  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false);



  useEffect(()=>{
    Axios.get('http://127.0.0.1:3001/api/get').then((response)=>{
      setMovieList(response.data)
    }) 

  }, [])

  const submitReview = () => {
    Axios.post("http://127.0.0.1:3001/api/insert", {
    movieName: movieName,
    movieReview: review,
  })

    setMovieList([
      ...movieReviewList,
      {movieName: movieName, movieReview: review},
    ]);
  };

  const deleteReview = (movie) =>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }
  const updateReview = (movie) =>{
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    console.log(newReview)
    setNewReview("")
    console.log(newReview)
  };

  const Login = details =>{
    console.log(details)
    if(details.email === adminUser.email && details.password === adminUser.password){
      console.log("Zalogowany")
      setUser({
        name: details.name,
        email: details.email
      })
      setIsLogged(true)
    }else{
      console.log("Wprowadziłeś złe dane")
      setError("Wprowadziłeś złe dane")
      setIsLogged(false)
    }
  }
  const Logout = details =>{
    setUser({
      name: "",
      email: "",
      password: ""
    })
    setIsLogged(false)
  }
  return (


    
    <div className="App">
      <h1>Recenzje CRUD</h1>
      <div className="logging">
        {(user.email!="")?(
        <div className="welcome">
        <h2>Witaj, <span>{user.name}</span></h2>
        <button onClick={Logout}>Logout</button> 
        </div>
        ): (
          <LogingForm Login={Login} error={error} />
        )}
      </div>
      
      <div className="form">

        <label>Movie name</label>
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value)
        }}/>

        <label>Review</label>
        <input type="text" name="review" onChange={(e)=>{
          setReview(e.target.value)
        }}/>

        <button type="button" class="btn btn-primary" onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=>{
          return(
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>
              
              <button id="delete" onClick={() => {deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e)=>{
                setNewReview(e.target.value)
              }}/>
              <button id="update" onClick={()=>{updateReview(val.movieName)}}>Update</button>
            </div>
          )

          
        })}
      </div>
        
    </div>


  );
}

export default App;
