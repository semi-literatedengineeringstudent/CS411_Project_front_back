import './App.css';
import React, {useState, useEffect}from 'react';
import Axios from "axios"

function App() {
  const [userName, setUserName] = useState("")
  const [userpassWord, setPassword] = useState("")
  const [userList, setUserList] = useState([])

  const [newPassword, setNewPassword] = useState("");

  const submitRecord = ()=>{
    Axios.post("http://localhost:3001/api/insert", {
      UserName: userName, 
      UserPassword:userpassWord,
    })

    setUserList([
      ...userList,
      {UserName: userName, UserPassword:userpassWord}
    ])
    //.then(()=>{
      //alert("Inserted!")
    //})
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setUserList(response.data)
    })
  })

  const deleteUser = (User) => {
    Axios.delete(`http://localhost:3001/api/delete/${User}`);
  }

 const updataPassword = (User) => {
    Axios.put("http://localhost:3001/api/update", {
      UserName: User, 
      UserPassword:newPassword,
    });
    setNewPassword("")
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <div className = "Form">
      <label>UserName</label>
      <input type="text" name = "username" onChange={(e)=>setUserName(e.target.value)}></input>
      <label>Password</label>
      <input type="text" name = "userpassword" onChange={(e)=>setPassword(e.target.value)}></input>
      <button onClick = {submitRecord}>Submit</button>


      {userList.map((val)=>{
        return (
          <div className = 'userCard'>
            <h1>UserName: {val.UserName}</h1> 
            <p> UserPassword:{val.UserPassword}</p>
            <button onClick = {() => {deleteUser(val.UserName)}}>Delete</button>

            <input type ="text" id = "updateInput" onChange={(e)=>{
              setNewPassword(e.target.value)
            }}/>
            <button onClick = {() => {updataPassword(val.UserName)}}>Update</button>

          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
