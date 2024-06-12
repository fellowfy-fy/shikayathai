import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import api from '../../api/axios';

const RegistrationComponent = () => {
  const { hideModal } = useModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [repassword, setRePassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== repassword) {
      setError("The password must be identical");
      return
    }
    try {
      await api.post('/api/register/', { name, email, password });
      hideModal();
      alert("User has been created");
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">Register</h5>
        <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Repeat Password
            </label>
            <input
              type="password"
              className="form-control"
              id="repassword"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationComponent;
