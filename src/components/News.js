import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles = []

  constructor(){
    super();
    this.state={
      articles:this.articles,
      loading:false,
      page:1,
      totalResults:0
    }
  }
  
 async componentDidMount(){
    let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=c02135a98dfb4f0aaef52fddc5b171a1&page=1&pageSize=20"
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData); 
    this.setState({articles:parseData.articles,totalResults:parseData.totalResults})
  }
  handlePrevClick = async()=>{
    console.log("prev")
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=c02135a98dfb4f0aaef52fddc5b171a1&page=${this.state.page -1}&pageSize=20`
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData); 
    // this.setState({})
    this.setState({
      page:this.state.page - 1,
      articles:parseData.articles

    })
  }
  handleNextClick = async()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    console.log("next")
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=c02135a98dfb4f0aaef52fddc5b171a1&page=${this.state.page + 1}&pageSize=20`
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData); 
    // this.setState({})
    this.setState({
      page:this.state.page + 1,
      articles:parseData.articles

    })
  }
  }
  render() {
    return (
      <>
      <div className='container'>
      <h1 className='text-center my-3'>NewsMonkey-Top Headlines</h1>
       <div className='row'>
       {this.state.articles.map((element)=>{
        return <div className='col sm' key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgurl={element.urlToImage} newsUrl={element.url}/>
        </div>
       })}
        
       </div> 
      </div>
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
      <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/20)} type="button" onClick={this.handleNextClick} className="btn btn-dark mx-8">Next &rarr;</button>
      </div>
      </>
    )
  }
}

export default News