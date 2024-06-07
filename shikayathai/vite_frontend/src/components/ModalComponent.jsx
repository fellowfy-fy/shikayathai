import React from 'react';
import { useModal } from '../context/ModalContext';
import './ModalComponent.css';

const ModalComponent = () => {
  const { modalContent, hideModal } = useModal();

  return (
    <div className={`modal fade ${modalContent ? 'show' : ''}`} style={{ display: modalContent ? 'block' : 'none' }} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {modalContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
