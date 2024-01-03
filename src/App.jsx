import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { Button } from 'react-bootstrap';


const API_URL = 'https://api.unsplash.com/search/photos'
const IMAGES_PER_PAGE = 20


function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const handleSearch = (event)=>{
    event.preventDefault();
    // console.log(searchInput.current.value)
    fetchImages();
    setPage(1);
  }

  const handleSelection = (selection)=>{
    searchInput.current.value = selection;
    fetchImages();
    setPage(1);

  };

  // console.log('page', page);

  const fetchImages = useCallback(async() => {
    try {
      const {data} = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=FOTLQW5ZzW2LnEtD6rqZNWSfoNxL9wi99g0L7MMf5Ik`
      );
      setImages(data.results);
      // console.log('data', images)
      setTotalPages(data.total_pages);

    } catch (error) {
      // console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [page]);

  return (
    <>
      <div className="container">
        <h1 className="title">तस्बिर खोजी</h1>
        <div className="search-section">
          <Form onSubmit={handleSearch}>
            <Form.Control 
              type='search'
              placeholder='Type something to search'
              className='search-input'
              ref={searchInput}
            />
            <Button type="submit">Search</Button>
          </Form>
        </div>
        <div className="filters">
          <div onClick={()=>handleSelection('nepal')}>Nepal</div>
          <div onClick={()=>handleSelection('touristplace')}>Tourist place</div>
          <div onClick={()=>handleSelection('food')}>Food</div>
          <div onClick={()=>handleSelection('mountains')}>Mountains</div>
        </div>
        <div className="images">
        {images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className='image'
            />
            );
          })}
        </div>
        <div className="buttons">
          {page > 1 && <Button onClick={()=>setPage(page-1)}>Previous</Button>}
          {page < totalPages && <Button onClick={()=>setPage(page+1)}>Next</Button>}
        </div>
      </div>      
    </>
  )
}

export default App
