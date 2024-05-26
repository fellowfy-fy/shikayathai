import React from "react";
import PropTypes from "prop-types";
import "../styles/FrameComponent.css";

const FrameComponent = ({ className = "", onReadMoreClick }) => {
  // Функция для демонстрации нажатия на кнопку
  const handleReadMoreClick = () => {
    // Вызов переданной функции onReadMoreClick, если она есть
    if (onReadMoreClick) {
      onReadMoreClick();
    } else {
      alert("Read more clicked!"); // Запасной вариант, если функция не передана
    }
  };

  return (
    <div className={`review-card ${className}`}>
      <div className="user-info">
        <div className="user-photo">
          <div className="user-initials">An</div>
        </div>
        <div className="user-details">
          <div className="user-name">Anjali</div>
          <div className="user-company">
            <div className="company-initials-wrapper">
              <div className="company-initials">St</div>
            </div>
            <div className="company-name">SuryaTech</div>
          </div>
        </div>
      </div>
      <div className="review-text">
        sampletext
      </div>
      <button className="read-more-button" onClick={handleReadMoreClick}>
        Read more
      </button>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  onReadMoreClick: PropTypes.func, // Добавлен новый проп для обработчика клика
};

export default FrameComponent;
