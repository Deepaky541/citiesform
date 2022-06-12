import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";




export const Cities = ({country}) => {
 
    const [info, setinfo] = useState([]);
    const [userData, setUserData] = useState({
        name:"",
        population:"",
        country:"india"
    });
    const [page, setpage] = useState(1);
    const [totalcount, settotalcount] = useState(0);
    const [sortt, setsortt] = useState("asc")
   
    
        useEffect(() => {
          
          axios({
            url: `http://localhost:8888/city`,
            params: {
              _page: page,
              _limit: 5
            },
          }).then((res) => {
             setinfo(res.data);
             settotalcount(Number(res.headers["x-total-count"]));
          });
        }, [page]);

         const newTask = (name,population,option) => {
           fetch("http://localhost:8888/city", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ 
                 name: name,
                 population:population,
                 country:option
             }),
           }).then((response) => response.json());
         };

         const handleChange=(e)=>{
             const {name, value}=e.target;
             setUserData({
                 ...userData,
                 [name]:value
             });
         }

          const submitHandler = (e) => {
            e.preventDefault();
            newTask(userData.name, userData.population, userData.country);
            setinfo([...info,{ 
              name: userData.name,
              population: userData.population,
              country: userData.country,
            }]);
            setUserData({
              name: "",
              population: "",
              country: "",
            });
          };

           const Ondelete = (id) => {
             fetch(`http://localhost:8888/city/${id}`, {
               method: "DELETE",
             });
             setinfo(info.filter((todo) => todo.id !== id));
           };

           const sort=(e)=>{
              setsortt(e.target.value)
           }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          name="name"
          type="text"
          value={userData.name}
          onChange={handleChange}
        />

        <input
          name="population"
          type="number"
          value={userData.population}
          onChange={handleChange}
        />

        <select name="country" value={userData.country} onChange={handleChange}>
          {country.map((el) => (
            <option key={uuidv4()} value={el}>
              {el}
            </option>
          ))}
        </select>

        <button type="submit">submit</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>population</th>
              <th>Country</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {info.map((el) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.population}</td>
                <td>{el.country}</td>
                <td>
                  <button onClick={() => Ondelete(el.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button disabled={page === 1} onClick={() => setpage(page - 1)}>
        prev
      </button>
      <button
        disabled={totalcount < page * 5}
        onClick={() => setpage(page + 1)}
      >
        next
      </button>
      <div>
        sort by:
        <select name="sort" id="" onChange={sort}>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </div>
    </div>
  );
}
