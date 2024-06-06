import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import axios from "../../api/axios";

const FileComplaintForm = () => {
  const { hideModal } = useModal();
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);

    try {
      console.log(formData);
      await axios.post("api/companies/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      hideModal();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">Add a company</h5>
        <button
          type="button"
          className="btn-close"
          onClick={hideModal}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Website
            </label>
            <input
              className="form-control"
              id="description"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileComplaintForm;
