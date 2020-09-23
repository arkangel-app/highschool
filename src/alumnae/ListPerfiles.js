import React, { useState ,useRef, useCallback} from 'react';
import useBookSearch from "./useInfiniteScrollPerfiles";
import { renderComponent, fromRenderProps } from 'recompose';
import { Form, Input, Icon, Card, Modal, Button, Label,Alert,message,Select,Checkbox,DatePicker, Row, Col } from 'antd';
import {
  Link
} from "react-router-dom";
export default function List(Componente){

  console.log(Componente)
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



  return (
    <>


      {books.map((book, index) => {


		  const { Meta } = Card;
        if (books.length === index + 1) {

			return (

                  <Col md={12} xs={24} className="colGaleryImg">
                        <div ref={lastBookElementRef} class="image-container effect gallery"
                            style={{backgroundImage:`url(${book.photo_path})`}}>



                        </div>
                  </Col>


			)
        } else {
			return (
						  <Col md={12} xs={24} className="colGaleryImg">
                        <div class="image-container effect gallery"
                            style={{backgroundImage:`url(${book.photo_path})`}}>

                        </div>
        </Col>


			)
        }


      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>


    </>
  )

}
