import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from '../../context';
import useReview from '../../hooks/useReview';

function ReviewForm(props) {
  const navigate = useNavigate();
  const { loggedUser } = useContext(Context);
  const { albumId } = useParams();
  
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const [data, loading, error, makeReview] = useReview();

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!loggedUser) {
      navigate("/login");
    } else {
      await makeReview(albumId, loggedUser.id, rating, comments);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reviews
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="0"
              max="5"
              step="0.5"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
          </Form.Group>
          {loading && <p>Submitting review...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {data && <p style={{ color: 'green' }}>Review submitted successfully!</p>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewForm;