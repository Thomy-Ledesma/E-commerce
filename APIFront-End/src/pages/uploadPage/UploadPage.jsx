import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./UploadPage.css";
import swal from "sweetalert";

const API_URL = "https://localhost:7051/products/addProduct";

const UploadPage = () => {
  const [name, setName] = useState("");
  const [band, setBand] = useState("");
  const [tracklist, setTracklist] = useState([""]);
  const [URL, setURL] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const handleTracklistChange = (index, event) => {
    const newTracklist = tracklist.map((track, i) =>
      i === index ? event.target.value : track
    );
    setTracklist(newTracklist);
  };

  const addTrack = () => {
    setTracklist([...tracklist, ""]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos
    if (
      !name ||
      !band ||
      !URL ||
      !price ||
      !category ||
      !amount ||
      tracklist.some((track) => !track)
    ) {
      mostrarAlerta("Faltan campos por completar", "warning", "Aceptar");
      return;
    }

    // Construcción del objeto album
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
      // Envío del formulario
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });

      // Éxito: mostrar alerta y recargar página
      console.log(album);
      mostrarAlerta(
        "El álbum se agregó con éxito!",
        "success",
        "Presione aceptar para continuar."
      );
      window.location.reload();
    } catch (error) {
      // Error: mostrar alerta de error
      console.error("Hubo un error al agregar el producto", error);
      mostrarAlerta("Hubo un error al agregar el producto", "error", "Aceptar");
    }
  };

  const mostrarAlerta = (text, icon, button) => {
    swal({
      text: text,
      icon: icon,
      button: button,
    });
  };

  return (
    <div className="upload-page d-flex justify-content-center align-items-center">
      <Form className="upload-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 text-white">Upload Album</h2>
        <div className="row">
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formAlbumName">
              <Form.Label className="form-title">Album name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter album name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formBandName">
              <Form.Label className="form-title">Band</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter band name"
                value={band}
                onChange={(e) => setBand(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formImageURL">
              <Form.Label className="form-title">Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="col-12">
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label className="form-title">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label className="form-title">Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="Rock">Rock</option>
                <option value="Electronica">Electrónica</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Pop">Pop</option>
                <option value="Otros">Otros</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-12">
            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label className="form-title">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {tracklist.map((track, index) => (
              <Form.Group
                key={index}
                className="mb-3"
                controlId={`formTrack${index}`}
              >
                <Form.Label className="form-title">{`Track ${
                  index + 1
                }`}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Track ${index + 1}`}
                  value={track}
                  onChange={(e) => handleTracklistChange(index, e)}
                  required
                />
              </Form.Group>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <Button
              type="button"
              variant="warning"
              size="sm"
              onClick={addTrack}
            >
              Add Track
            </Button>

            <Button
              variant="warning"
              type="submit"
              size="sm"
              oonClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UploadPage;
