import React from 'react';
import { useModal } from '../context/ModalContext';

const ModalComponent = () => {
  const { modalContent, hideModal } = useModal();

  return (
    <div className={`modal fade ${modalContent ? 'show' : ''}`} style={{ display: modalContent ? 'block' : 'none' }} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal</h5>
            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {modalContent}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
