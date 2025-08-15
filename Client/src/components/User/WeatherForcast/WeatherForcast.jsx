import React, { useEffect, useState } from 'react'
import getFormattedWeatherData from './weatherService';
import TimeAndLocation from './TimeAndLocation';
import TemperatureAndDetails from './TemperatureAndDetails';
// import Forecast from './Forecast';

const WeatherForcast = ({tour}) => {
    
    const [query, setQuery] = useState({ q: tour.location });
    const [weather, setWeather] = useState(null);


    const handleWeatherForecast = async () =>{
        
          setQuery({q:tour.location});
        
          await getFormattedWeatherData({ ...query}).then((data) => {
            setWeather(data);
          });
    }
    
    
  return (
     <section className="weather-forecast-section  flex flex-col justify-center py-16">
         <div className="container  flex justify-center items-center py-10">
              <div className="check-weather-button  p-2 text-white text-lg rounded-3xl bg-[#32af6f] hover:cursor-pointer" onClick={handleWeatherForecast}>
                  Check Weather Forecast
              </div>
         </div>
         {weather && (
        <div className='bg-[#32af6f]'>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
{/* 
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} /> */}
        </div>
      )}

     </section>
  )
}

export default WeatherForcast