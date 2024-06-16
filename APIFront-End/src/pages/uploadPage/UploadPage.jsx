import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const API_URL = "https://localhost:7051/products/addProduct";

const UploadPage = () => {
  const [name, setName] = useState('');
  const [band, setBand] = useState('');
  const [tracklist, setTracklist] = useState(['']);
  const [URL, setURL] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  const handleTracklistChange = (index, event) => {
    const newTracklist = tracklist.map((track, i) => (i === index ? event.target.value : track));
    setTracklist(newTracklist);
  };

  const addTrack = () => {
    setTracklist([...tracklist, '']);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const album = {
      name: name,
      band: band,
      tracklist: tracklist,
      URL: URL,
      price: price,
      category: category,
      amount: amount,
    };
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(album),
      }).then(() =>{
        console.log(album)
      })
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formAlbumName">
        <Form.Label>Album name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter album name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBandName">
        <Form.Label>Band</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter band name"
          value={band}
          onChange={(e) => setBand(e.target.value)}
          required
        />
      </Form.Group>

      {tracklist.map((track, index) => (
        <Form.Group key={index} className="mb-3" controlId={`formTrack${index}`}>
          <Form.Label>{`Track ${index + 1}`}</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Track ${index + 1}`}
            value={track}
            onChange={(e) => handleTracklistChange(index, e)}
            required
          />
        </Form.Group>
      ))}

      <Button type="button" onClick={addTrack}>
        Add Track
      </Button>

      <Form.Group className="mb-3" controlId="formImageURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UploadPage;
