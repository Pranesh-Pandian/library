import React, { useEffect, useState } from "react";
import axios from "axios";

const Home=()=>{
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("name");
  const [page, setPage] = useState(1);
  const [count] = useState(3);


  useEffect(() => {
          axios.get("http://localhost:5500/books")
          .then((res) => {setData(res.data);})
          .catch((err) => {console.log("Error fetching data:",err);
        });
    });

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

  return (
    <div className="find">
      <div>
        <div id="se">Search Books</div>
        <select value={category} onChange={handleCatChange} className="sesel">
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="subject">Subject</option>
        </select>
        <input type="text" placeholder={category} value={search} onChange={handleSearchChange} className="search"/>
      </div>
      <span>No of Books : {sdata.length}</span>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(start, end).map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{item.subject}</td>
              <td>{item.date}</td>
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
