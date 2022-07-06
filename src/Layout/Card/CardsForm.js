import React from "react";
import { Link } from "react-router-dom";

function CardsForm({ formData, setFormData, submit }) {
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  return (
    <form>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          name="front"
          className="form-control"
          placeholder="Front side of card"
          onChange={changeHandler}
          value={formData.front}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          name="back"
          placeholder="Back side of card"
          className="form-control"
          onChange={changeHandler}
          value={formData.back}
        ></textarea>
      </div>
      <Link to="../">
        <button value="Cancel" className="btn btn-secondary mx-3">
          Cancel
        </button>
      </Link>
      <button className="btn btn-primary mx-2" onClick={submit}>
        Save
      </button>
    </form>
  );
}

export default CardsForm;
