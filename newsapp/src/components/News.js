import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

  static defaultProps={
     pageSize:8,
     category:'general'
  }

  static propTypes={

     pageSize :PropTypes.number,
     category :PropTypes.string

  }

   capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading : false,
      page : 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-ApniNews`;
  }
  
 
  async updateNews(){

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=9c164ae37e894785a00a4f4a9d347f8d&page=1&pageSize=${this.props.pageSize}`;
         this.setState({loading:true})
         let data = await fetch(url);
         let parsedData = await data.json()
         this.setState({
          articles: parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })

  }
   async componentDidMount(){
         let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=9c164ae37e894785a00a4f4a9d347f8d&page=1&pageSize=${this.props.pageSize}`;
         this.setState({loading:true})
         let data = await fetch(url);
         let parsedData = await data.json()
         this.setState({
          articles: parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })
  }

  handleNextvbtn=async()=>{
 
  this.setState({ page :this.state.page+1})
  this.updateNews();
  }

  handlePrevbtn= async()=>{
     
    this.setState({ page :this.state.page-1})
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>{"News Now - The Top " + this.capitalizeFirstLetter(this.props.category) + " Headlines!!"}</h1>
        {this.state.loading && <Spinner/>}
        <div className='row my-2'>
         {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,40):" "} description={element.description?element.description.slice(0,80):" "}
              imageURL= {element.urlToImage} newsURL={element.url}  author={element.author} date={element.publishedAt}/>
          </div>
         })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page<=1} class="btn btn-secondary" onClick={this.handlePrevbtn}>&larr; Previous</button>
          <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} class="btn btn-secondary"onClick={this.handleNextvbtn}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
