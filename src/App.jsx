
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] =useState({
    celcius:10,
    name:'London',
    Humidity:10,
    speed:2
  })

  const [name , setName ]=useState('');
  const [error , setError ]=useState('');

  

  const handleclick=()=>{
    if(name !== "") {
      const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=dca9745f193cf8c150b140c359ff93fb&&units=metric`
      axios.get(apiUrl)
      .then(res=>{
        setData({...data,celcius:res.data.main.temp , name:res.data.name, humidity: res.data.main.humidity, speed : res.data.wind.speed })
        setError('');
      })
      .catch(error=>{
        if(error.response.status === 404){
          setError("Invalid City Name")
        }
        else{
          setError('');
        }
        console.log(error)
      });
    }
  }

  return (
    <>
      <div className="weatherbg " >
         <h1 className="word">Weather app</h1>


        <input type="text" className='enter' placeholder='City Name' onChange={e=> setName(e.target.value)}/>

        <button type="button" className="btn" onClick={handleclick}>
          Get Weather
        </button>
      </div>



      <div className='answer'>
          <img className='wicon'
          src="https://blog.weatherbit.io/content/images/2022/12/blog4.png" alt="" />

          <div className="error">
            <p>{error}</p>
          </div>

          <h1 className='temp'>{Math.round(data.celcius)} °C</h1>
          <p className='city'>{data.name}</p>


          <div className='output'>
              <div>
                <p className='humidity'>Humidity : {data.humidity} </p>
                
              </div>
              <div>
                <p className='wind'>Wind Speed : {Math.round(data.speed)} Km/h</p>
                
              </div>
          </div>

          
      </div>
    </>
  );
}

export default App;
