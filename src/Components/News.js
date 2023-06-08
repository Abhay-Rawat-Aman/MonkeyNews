import React, { Component } from 'react'
import Spinner from '../Spinner';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category: 'general'
    }
    
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category: PropTypes.string
    }
    constructor (props)
    {
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`${this.props.category} - NewsMonkey`;
    }

    
    async updateNews()
    {
        this.props.setProgress(10);
        let url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        
        let data =await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount()
    {
        this.updateNews();
    }
    /*handlePrevClick = async ()=>{
        this.setState({page:this.state.page-1});
        this.updateNews();   
    }
    handleNextClick= async ()=>{
        this.setState({page:this.state.page+1});
        this.updateNews();
    }*/
    fetchMoreData = async() =>
    {
        const url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page:this.state.page+1});
        this.setState({loading:true});
        
        let data =await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false,
        })
    }
  render() {
    return (
      <div className="container my-3 ">
        <h1 className='text-center' style={{margin:'90px'}}>NewsMonkey - Top  {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {/*!this.state.loading && */ this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url} >
            <Newsitem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
        })}
        </div>
        </div>

        </InfiniteScroll>
        {
        //<div className="container d-flex justify-content-between">
        //<button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        //<button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        //</div>
        }
      </div>
    )
  }
}

export default News
