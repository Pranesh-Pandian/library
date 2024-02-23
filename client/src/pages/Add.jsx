import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

    const navi=useNavigate()

    const handleChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
    };
    const handleDChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
        setInputValue(e.target.value);
    };

    const handleClick= async e =>{
        e.preventDefault()
        try {
            const res=await axios.post("http://localhost:5500/add",emps)
            if(res.data==="0") alert("Name is Empty")
            else if(res.data==="1") alert("Author is Empty")
            else if(res.data==="2") alert("Subject is Empty")
            else if(res.data==="3") alert("Date is Empty")
            else{
            alert("Succesfully added")
            navi("/adm")
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
        <input type={inputType} value={inputValue} onChange={handleDChange} onFocus={handleFocus} onBlur={handleBlur} max={maxDate} placeholder="Publish Date" name="date"/>
        <button onClick={handleClick} className='doo'>Add</button>
    </div>
  )
}

export default Add