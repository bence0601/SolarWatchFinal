import { useState } from "react";
import { Form } from "react-router-dom";


function App() {
  const token = localStorage.getItem("token");
  const [city,setCity] = useState("");
  const [date,setDate] = useState("");
  const [responseData,setResponseData] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(date)
    fetch(`https://localhost:7008/Solar/api/solar?cityname=${city}&date=${date}`,
    {
      method : "GET",
      headers : {"Content-Type" : "application/json", Authorization : `Bearer ${token}`},


    }).then((res) => res.json())
      .then((data) => {
        console.log("response:", data);
        setResponseData(data);
        
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
  return <div><form>
    <input type="text" onChange={(e)=>{setCity(e.target.value)}} placeholder="Cityname" ></input>
    <input type="text" onChange={(e)=>{setDate(e.target.value)}} placeholder="Date" ></input>
    <button type="button" onClick={handleSubmit}>Submit</button>

    </form>
    {
      responseData && (
        <div><h1>response : </h1>
        <div>city : {city}</div>
        <div>sunrise : {responseData.sunrise}</div>
        <div>sunset : {responseData.sunset}</div>
        </div>
      )

    }

    </div>
   
}

export default App;
