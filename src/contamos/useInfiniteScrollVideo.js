import { useEffect, useState } from 'react'
import axios from 'axios'
import restClient from '../network/restClient';
export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
	let cancel
	console.log(query)
	console.log(pageNumber)
	
	restClient.getVideos({pageSize: 20,pageNumber:pageNumber})
	.then(res=>{
		let noticias  = [];
			console.log(res)
				setBooks(prevBooks => {
					return [...new Set([...prevBooks, ...res.data.videos.pages.map(b => b)])]
					 })
				setHasMore(res.data.videos.pages.length > 0)
				setLoading(false)
				console.log(books)
	
	}).catch(e => {
				if (e) return e
				setError(true)
			});

   
  }, [query, pageNumber])

  return { loading, error, books, hasMore }
}
