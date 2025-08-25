import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title,description,imageURL,newsURL,author,date} = this.props;
    return (
      <div>
        <div className="card" style={{width: '14rem'}}>
          <img src={!imageURL?"https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg":imageURL} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-body-secondary">By {author} on {date} </small></p>
            <a href={newsURL}  target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>  
      </div>
    )
  }
}
