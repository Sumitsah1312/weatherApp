
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] =useState({
    celcius:10,
    name:'London',
    humidity:10,
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
      <div className="bg-[url('https://nordicapis.com/wp-content/uploads/How-to-Build-an-API-Driven-Weather-App-1024x576.png')] text-center min-h-half justify-center" >
         <h1 className="text-white font-bold mx-auto text-3xl p-20 ">Weather app</h1>



        <input type="text" className="text-xl rounded-xl px-4 py-1 border-gray-100 font-semibold uppercase bg-slate-200  " placeholder='City Name' onChange={e=> setName(e.target.value)}/>

        <button type="button" className="m-10 bg-orange-300 p-1 rounded-lg  " onClick={handleclick}>
          Get Weather
        </button>
      </div>



      <div className='bg-slate-300 justify-center place-content-center  w-1/3 rounded-xl p-5 border-gray-100   text-center  mx-[30%] my-3'>
          <img className='max-h-44 mx-auto '
          src="https://blog.weatherbit.io/content/images/2022/12/blog4.png" alt="" />

          <div className="mx-auto my-2 text-red-600 ">
            <p>{error}</p>
          </div>

          <h1 className='text-2xl font-semibold my-1.5'>{Math.round(data.celcius)} °C</h1>
          <p className='city'>{data.name}</p>


          <div className='output'>
              <div>
                <p className='py-2'>Humidity : {data.humidity} </p>
                
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
