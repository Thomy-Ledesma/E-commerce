import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ReviewList(props) {
    console.log(props.reviews)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            {props.reviews.map((review) =>{
                return (
                <div key={review.userID}>
                    <h4>{review.rating}</h4>
                    <h6 style={{marginLeft:"2em"}}>{review.comments}</h6>
                    <hr/>
                </div>                    
            )
            })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewList