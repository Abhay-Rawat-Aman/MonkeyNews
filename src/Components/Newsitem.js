import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date}=this.props;
    return (
      <div className="my-3">
        <div className="card">
  <img src={imageUrl?imageUrl:"https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/mpx/2704722219/2023_02/1675947087659_n_mj_twitter_230209_1920x1080-9vcn18.jpg"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>{"news"}</span>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
  </div>
    </div>
      </div>
    )
  }
}

export default Newsitem
