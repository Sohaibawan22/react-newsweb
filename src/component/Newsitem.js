import React from 'react'
import '../App.css'; // Importing the CSS file for styling

const Newsitem=(props)=>  {
 
    let { title, description, imgurl,newsurl,author,date } = props;
    return (
      <div id='item'>
        <div className="card"   style={{ width: '18rem' }}>
          <img src={imgurl} className="card-img-top" alt="pic is not given in data" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text mb-0">{description}</p>
            <p className="card-text mt-0"><small className="text-muted">By {author} on {date}</small></p>
            <a href={newsurl} className="btn btn-sm btn-dark">read more</a>
          </div>
        </div>
      </div>
    )

}

export default Newsitem
 
            