import React from 'react'
import { useState } from 'react';

export const Countries = ({onfetch}) => {
    const [countryy, setcountryy] = useState("");

    const newTaskData = (data) => {
     fetch("http://localhost:8888/countries", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({country: data} ),
     }).then((response) => response.json());
     onfetch(data);
     setcountryy("");
    };
    
  return (
    <div>
      <br></br>
      <h3>Enter country name</h3>
      <input type="text" value={countryy} onChange={(e)=>(setcountryy(e.target.value))} />
      <button onClick={()=>(newTaskData(countryy))}>submit</button>
    </div>
  )
}
