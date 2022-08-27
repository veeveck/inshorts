import './App.css';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import NewsContent from './components/NewsContent/NewsContent';
import axios from 'axios';
import Footer from './components/Footer/Footer';

function App() {
  const [category,setCategory]=useState("General");
  const [newsArray,setNewsArray]=useState([]);
  const [newsResults,setNewsResults]=useState();
  const [loadmore,setLoadmore]=useState(10);
  console.log(process.env);
  const newsApi=async()=>{
       try{ 
        const news= await axios.get(`
        https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&category=${category}&pageSize=${loadmore}`);
        setNewsArray(news.data.articles);
        setNewsResults(news.data.totalResults);
       }
       catch(error){
        console.log(error);
       }
  }
  console.log(newsArray);
  useEffect(()=>{
    newsApi();
  },[newsResults,category,loadmore])
  return (
    <div className="App">
      <NavBar setCategory={setCategory}/>
      <NewsContent 
      setLoadmore={setLoadmore}
      loadmore={loadmore}
      newsArray={newsArray}
      newsResults={newsResults}
      />
      <Footer/>
    </div>
  );
}

export default App;
