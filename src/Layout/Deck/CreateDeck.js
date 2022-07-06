import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const changeHandler = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData({ name: "", description: "" });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label> <br></br>
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Deck Name"
            onChange={changeHandler}
            value={formData.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label> <br></br>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Brief description of the deck"
            onChange={changeHandler}
            value={formData.description}
          ></textarea>
        </div>
        <Link to="/">
          <button value="Cancel" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary mx-2" onClick={handleSubmit}>
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
}

export default CreateDeck;
