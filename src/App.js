
import './App.css';
import { Cities } from './components/Cities';
import { Countries } from './components/Countries';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [fetch, setfetch] = useState([])

       useEffect(() => {
         axios({
           url: "http://localhost:8888/countries",
         }).then((res) => {
           res.data.map((el) => fetch.push(el.country));
           setfetch([...fetch]);
         });
       }, []);

  const datafetch=(data)=>{
   setfetch([...fetch,data]);
  }

  return (
    <div className="App">
    <Cities country={fetch}/>
    <Countries onfetch={datafetch} />
    </div>
  );
}

export default App;
