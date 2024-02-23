import {React,useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Admlogin = () => {

  const [login,setLogin]=useState({
    username:"",
    password:""
  })
  const navi=useNavigate()
  const handleChange=(e)=>{
    setLogin(prev=>({...prev,[e.target.name]:e.target.value}))
  };
  const handleClick= async e =>{
    console.log(login);
    if(login.username==="") alert("Enter Admin Name!")
    else if(login.password==="") alert("Enter Admin PassCode!")
    else
    if(login.username==="Pranesh Pandian S"){
    if(login.password==="pranigo"){
        alert("Admin access Granted!!");
        navi("/adm")
    }
    else alert("Admin access Denied!!")
    }
    else alert("Admin access Denied!!")
  };

  return (
    <div id="lgmain">
        <div className="finaldisp">
            <h1>Admin Login</h1>
            <input type="text" id='username' onChange={handleChange} placeholder='Admin name' spellCheck='false' name='username' autoComplete='off'/> <br />
            <input type="password" id='password' onChange={handleChange} placeholder='Password' spellCheck='false' name='password' autoComplete='off'/>
            <button className='lgbtn' onClick={handleClick}>Login</button>
        </div>
    </div>
  )
}

export default Admlogin