import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
 // document.title=`${this.capitalizeFirstLetter(props.category)}-Newsmonkey`;
News.defaultProps={
country:'in',
pageSize:8,
category:'general'
}
News.propTypes={
country:PropTypes.string,
pageSize:PropTypes.number,
category:PropTypes.string,
}
const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() +string.slice(1);
}
   
 const  updateNews = async()=>
 {
  props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //this.setState({loading:true});
    setLoading(true);
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
  
    setLoading(false);
    
    props.setProgress(100);
 }

 useEffect(() => {
   
  updateNews();
   
 }, [])
 
 // const componentDidMount =async()=>{
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0fe9d04d00624a18a5382589e92563e5&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //     totalResults:parsedData.totalResults,
    //     loading:false
    // })
   
 //}
//  handlePrevClick = async() =>{
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0fe9d04d00624a18a5382589e92563e5&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
   
    // this.setState({
    //     page:this.state.page-1,
    //     articles:parsedData.articles,
    //     loading:false
    // })
   //  this.setState({page:this.state.page -1});
   //  this.updateNews();
//  }
//  handleNextClick = async() =>{
    
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0fe9d04d00624a18a5382589e92563e5&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    
    // this.setState({
    //     page:this.state.page+1,
    //     articles:parsedData.articles,
    //     loading:false
    // })
//     this.setState({page:this.state.page +1});
//     this.updateNews();
//  }
const fetchMoreData = async() => {
  
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page +1);
   let data= await fetch(url);
   let parsedData= await data.json();
   console.log(parsedData);
   
  //  this.setState({articles:this.state.articles.concat(parsedData.articles),
  //      totalResults:parsedData.totalResults,
       
  //  })
  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);

 };
    
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'30px 0',marginTop:'90px'}}>NewsMonkey:Top headlines-{capitalizeFirstLetter(props.category)}</h1>
        {/* {this.state.loading&&<Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
         <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return   <div className="col-md-4"  key={element.url} >
               <NewsItem title={element.title?element.title:""} description={element.description?element.description:""}imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
               </div>
        })}
           </div>
           </div>
           </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        {/* <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)}type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button> */}
        </div>
      </div>
    )
  
}

export default News
