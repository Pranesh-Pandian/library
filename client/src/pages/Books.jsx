import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home=()=>{
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("name");
  const [page, setPage] = useState(1);
  const [count] = useState(8);
  const [change,setChange]=useState(false)  


  useEffect(() => {
          axios.get("https://library-jops.onrender.com/books")
          .then((res) => {setData(res.data);})
          .catch((err) => {console.log("Error fetching data:",err);}
          );
          
    },[]);

    const handleFav=async ()=>{
      const res=await axios.get("https://library-jops.onrender.com/likebooks")
      setData(res.data)
      setChange(true)
    }
  const handleSearchChange=(e)=>{
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCatChange=(e)=>{
    setCategory(e.target.value);
  };


  const sdata=data.filter((item) => {
    if (search === "") return true;
    else if (category === "name" && item.name.toLowerCase().includes(search.toLowerCase())) return true;
    else if (category === "author" && item.author.toLowerCase().includes(search.toLowerCase())) return true;
    else if (category === "subject" &&item.subject.toLowerCase().includes(search.toLowerCase())) return true;
    else return false;
  });

  const sortedData = sdata.sort((a, b) => {
      return new Date(a.published) - new Date(b.published);    
  });

  const end = page * count;
  const start = end - count;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sdata.length/count); i++) 
    pageNumbers.push(i);

  const handleClick = (number) => {
    setPage(number);
  };

  const handleLike =async (id,l)=> {
    try {
      await axios.put("https://library-jops.onrender.com/like/"+id,[l]);
      window.location.reload()
    } catch (err) {
      console.log(err)
    } 
  }
  const handleBoro =async (id,l)=> {
    try {
      console.log(l)
      await axios.put("https://library-jops.onrender.com/boro/"+id,[l]);
      window.location.reload() 
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={sdata.length<=6 || count<=6 ? "finds" :"find"}>
      <div className="admi"><button><Link to="/login">Admin</Link></button></div>
      <div className="sum">

        <h1 id="tit">Prani-Library</h1>
        <div id="se">Search Books</div>
        <div className="ssss">
        <select value={category} onChange={handleCatChange} className="sesel">
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="subject">Subject</option>
        </select>
        <input type="text" placeholder={category} value={search} onChange={handleSearchChange} className="search"/>
      {change?<button id='add' onClick={()=>{window.location.reload()}}>All</button>:<button id='add' onClick={handleFav}>Fav</button>}
        </div>
      </div>
      <span id="nbk">No of Books : {sdata.length}</span>
      <table>
        <thead>
          <tr>
            <th className="like">Fav</th>
            <th>Name</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Published</th>
            <th>Borrow</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(start, end).map((item, index) => (
            <tr key={index} >
              {item.fav?<td onClick={()=>handleLike(item.id,item.fav)} className="like">❤️</td>:<td onClick={()=>handleLike(item.id,item.fav)} className="likes">♡</td>}
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{item.subject}</td>
              <td>{item.date}</td>
              <td><p><button className="boro" disabled={!item.borrow} onClick={()=>handleBoro(item.id,item.borrow)}>Borrow</button></p></td>
              <td><p><button className="boro" disabled={!item.ret} onClick={()=>handleBoro(item.id,item.borrow)}>Return</button></p></td>
            </tr>
          ))}
        </tbody>
      </table>
      <flex className='dispf'>
        {pageNumbers.map((number) => (
          <span key={number} className="buttonn">
            {page===number ? (
              <span role="button" className="summas"  onClick={() => handleClick(number)}>
                {number}
              </span>
            ) : (
              <span role="button" className="summa" onClick={() => handleClick(number)}>
                {number}
              </span>
            )}
          </span>
        ))}
      </flex>
    </div>
  );
};

export default Home;
