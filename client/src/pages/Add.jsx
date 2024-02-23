import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// const ID_REGEX = /^[A-z][A-z0-9-_]{3,10}$/;

const Add = () => {

    const [emps,setEmp]=useState({
      name:"",
      author:"",
      subject:"",
      date:""
    })

    const [inputType, setInputType] = useState('text');
    const [inputValue, setInputValue] = useState('');

    const handleFocus = () => {
        setInputType('date');
      };


      const handleBlur = () => {
        if (!inputValue) {
          setInputType('text');
        }
      };
        // const[user,setUser]=useState(false)

    const navi=useNavigate()

    const handleChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
        // setInputValue(e.target.value);
    };
    const handleDChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
        setInputValue(e.target.value);
    };

    const handleClick= async e =>{
        e.preventDefault()
        try {
            const res=await axios.post("https://library-jops.onrender.com/add",emps)
            if(res.data==="0") alert("Empty fields")
            else{
            alert("Succesfully added")
            navi("/")
            }
        } catch (err) {
            console.log(err)
        } 
    }
    
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
  
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
  
    var maxDate = year + '-' + month + '-' + day;
    console.log(emps)
    return (
    <div className='form'>
        <h1 className='head'>Add Books</h1>
        <input type="text" placeholder='Name' onChange={handleChange} name='name'/>
        <input type="text" placeholder='Author' onChange={handleChange} name='author'/>  
        <input type="text" placeholder='subject' onChange={handleChange} name='subject'/>
        {/* <select name="gender" id="input" onChange={handleChange}>
            <option value="" disabled selected id="pc">Gender (M or F)</option>
            <option value="M">M</option>
            <option value="F">F</option>
        </select> */}
        {/* <input type="text" placeholder='Gender (M or F)' onChange={handleChange} name='gender'/> */}
        <input type={inputType} value={inputValue} onChange={handleDChange} onFocus={handleFocus} onBlur={handleBlur} max={maxDate} placeholder="Date of Birth" name="date"/>
        {/* <input type="date" placeholder='Dob' onChange={handleChange} value={"Date Of Birth"} name='dob'/> */}
        {/* <input type="number" placeholder='Age' onChange={handleChange} name='age' min={18}/> */}
        {/* <input type="email" placeholder='Email' onChange={handleChange} name='email'/> */}
        {/* <input type="number" placeholder='Percentage' onChange={handleChange} name='percent' min={0}/> */}
        {/* <input type="number" placeholder='Phone Number' onChange={handleChange} name='phno'/> */}
        <button onClick={handleClick} className='doo'>Add</button>
    </div>
  )
}

export default Add