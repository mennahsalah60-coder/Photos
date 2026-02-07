import { useState } from 'react'
import './App.css'
import Photo from './assets/components/photos/photo.jsx'
import image from './assets/components/photos/images/image-icon.svg'
import search from './assets/components/photos/images/search-svgrepo-com.svg'


function App() {
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const popularItems = ["Nature", "Ocean", "City", "Mountains", "Sky"]

  const handleSubmit = (e, item) => {
    if (e) e.preventDefault() //form
    const searchItem = item || query
    if (!searchItem.trim()) return

    setLoading(true)
    fetch(`https://api.pexels.com/v1/search?query=${searchItem}`, {
      headers: {
        Authorization: "n2XVmftWLbw7nqlHCVG8OfA3vcwX9qcUsZPrDD8qVXybpImmD9IafTLR"
      },
    })
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos || [])
        setSearched(true)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const popular = (item) => {
    setQuery(item)
    setLoading(true)
    handleSubmit(null, item)
    setLoading(false)
  }

  return (
    <>
      <div className='photos'>
        <div className='title'>
          <img src={image} alt="" />
          <h1>PhotoSearch</h1>
        </div>
        <p>Discover stunning high-quality images</p>
        <section className="search">
          <div className='searchBox'>
            <form onSubmit={handleSubmit}>
              <img src={search} alt="" />
              <input type="text" placeholder="Search for beaytiful photos..." onChange={(e) => setQuery(e.target.value)} value={query} />
              <button type="submit">Search</button>
            </form>
          </div>
        </section>
        <div className="nothing">
          <p>Popular: </p>
          {popularItems.map((item) => (
            <span
              key={item}
              className='box'
              onClick={() => popular(item)
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className='items'>
        {searched && query && (
          <h3 className='item'>"{query}"</h3>
        )}
        {searched && query && (
          <p>{photos.length} photos</p>
        )}
      </div>

      <div className='photo'>
        {searched && photos.map((photo, index) => (
          <a href={photo.src.original}
            target='_blank'
            key={photo.id}
            className='img'
          >
            <img src={photo.src.medium} style={{ animationDelay: `${index * 0.15}s` }} alt="" />
            <div className='des'>
              <h1>
                {photo.photographer
                  .split(/\s+/)  //like array
                  .map(word => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </h1>

              <div>
                <h3
                  id={photo.id}
                  idPhotographer={photo.photographer_id}
                >{photo.photographer}</h3>
                <p>{photo.alt}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <Photo searched={searched} onPopularClick={popular} loader={loading} />
    </>
  )
}

export default App
