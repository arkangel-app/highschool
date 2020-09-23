import React, { useState ,useRef, useCallback} from 'react';
import useBookSearch from "./useInfiniteScroll";
import { renderComponent } from 'recompose';
import { Form, Input, Icon, Card, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Redirect,
  HashRouter,
  withRouter,
  Link
} from "react-router-dom";
import Footer from '../Footer2'
export default function List(){

	const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)
console.log(books)
  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  function viewPost(post){
  	 this.props.history.push(`/post-page/${post}`);
     }
  return (
    <>


      {books.map((book, index) => {


		  const { Meta } = Card;
        if (books.length === index + 1) {

			return (


						<Col md={12} xs={24} className="newsCard">
						<Card className="cardNew" 
							cover={
								<div ref={lastBookElementRef} className="boxImgNew newsFeed">
									 <div className="coverNewImg" style={{backgroundImage: `url(${book.photo})`}}></div>
								</div>
							}
						>
							<Meta
							title={book.title}
							description={<div>
								{book.short_description}
								<div className="readMoreBox feed">
									<Link className="readMoreBtn"  to={`/post-page/${book.id_noticia}`}>

										 <div className="whiteBtn square feed">
											 Leer
										 </div>
										 <span className="lightBtn">
											  más
										 </span>
									 </Link>
								</div>
								</div>}
							/>
						</Card>
						</Col>




			)
        } else {
			return (


						<Col md={12} xs={24} className="newsCard">
						<Card className="cardNew"
							cover={
								<div className="boxImgNew newsFeed">
									 <div className="coverNewImg" style={{backgroundImage: `url(${book.photo})`}}></div>
								</div>
							}
						>
							<Meta
							title={book.title}
							description={<div>
								{book.short_description}
								<div className="readMoreBox feed">
									    <Link className="readMoreBtn"  to={`/post-page/${book.id_noticia}`}>

										 <div className="whiteBtn square feed">
											 Leer
										 </div>
										 <span className="lightBtn">
											  más
										 </span>
									 </Link>
								</div>
								</div>}
							/>
						</Card>
						</Col>





			)
        }


      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>


    </>
  )

}
