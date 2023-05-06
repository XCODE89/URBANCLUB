import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postEvent } from "../../redux/eventSlice";

import "./CreateEvent.css";

const CreateEventTemplate = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    eventPhoto: "",
    name: "",
    price: "",
    location: "",
    nameArena: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  const [rutaImagen, setRutaImagen] = useState("");
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState({});
  console.log(files);

  function validate(input) {
    const errors = {};
    if (!input.name) {
      errors.name = "Se require Nombre del Evento";
    }
    if (!input.eventPhoto) {
      errors.eventPhoto = "Se requiere Foto";
    }
    if (!input.price) {
      errors.price = "Se requiere Precio";
    }
    if (!input.location) {
      errors.location = "Se requiere Direccion";
    }
    if (!input.nameArena) {
      errors.nameArena = "Se requiere Nombre del Lugar";
    }
    if (!input.date) {
      errors.date = "Se requiere Fecha";
    }
    return errors;
  }

  function handleOnChange(e) {
    // console.log("errores///", errors.password);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  //Manipular el archivo qué se sube:
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const files = e.target.files;
    setFiles(files);
    const reader = new FileReader();

    setInput({
      ...input,
      eventPhoto: file.name,
    });
    reader.readAsDataURL(file);
    reader.onload = () => {
      setRutaImagen(reader.result);
    };
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(errors);
    const formData = new FormData(e.target);
    formData.append("id_Artist", id);
    dispatch(postEvent(formData, navigate("/events")));
  };

  return (
    <div className="create-event">
      <div className="error_back" style={{ color: "aqua" }}>
        Aqui va a ir un error
      </div>
      <div className="create-event-container">
        <div className="create-event-left">
          {rutaImagen ? (
            <img
              className="form-picture"
              src={rutaImagen}
              alt="Imagen de perfil"
            />
          ) : (
            ""
          )}
          <button
            className="upload-picture-button"
            type="button"
            name="profilePhoto"
            onClick={handleClick}
          >
            Subir foto
          </button>
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            name="profilePhoto"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
        <div className="create-event-right">
          <form className="create-event-form" onSubmit={handleSubmit}>
            <h2>Crea Tu Evento</h2>
            <div className="form-inputs">
              <div className="input-container">
                <label htmlFor="name">Nombre del evento:</label>
                <br />
                <input
                  placeholder={errors.name}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  type="text"
                  value={input.name}
                  maxLength="35"
                  name="name"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="price">Precio de la entrada: U$D</label>
                <br />
                <input
                  placeholder={errors.price}
                  type="text"
                  value={input.price}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  name="price"
                  maxLength={35}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="location">Ubicación:</label>
                <br />
                <input
                  placeholder={errors.location}
                  type="text"
                  value={input.location}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  name="location"
                  maxLength={45}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="nameArena">Nombre del arena / Escenario:</label>
                <br />
                <input
                  placeholder={errors.nameArena}
                  type="text"
                  value={input.nameArena}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  name="nameArena"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="date">Fecha:</label>
                <br />
                <input
                  type="text"
                  value={input.date}
                  onChange={handleOnChange}
                  onBlur={handleOnChange}
                  name="date"
                />
              </div>
              <br />
              <div className="submit-button">
                <button type="submit">Crear Evento</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventTemplate;
