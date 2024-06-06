import React from "react";
import "./FAQSection.css";

const FAQSection = () => (
  <section className="faq-section">
    <div className="section-header">
      <div className="section-title-wrapper">
        <b className="section-title">FAQ</b>
      </div>
      <div className="section-subtitle">Your Guide to Getting Heard</div>
    </div>
    <div className="faq-list">
      <div className="faq-item">
        <b className="faq-question">How do I file a complaint?</b>
        <div className="faq-answer">
          Just share your ordeal, and we'll escalate it - both on our
          platform and by filing an official complaint through the Indian
          Consumer Helpline and directly to the company.
        </div>
      </div>
      <div className="faq-item">
        <b className="faq-question">Will my complaint be public?</b>
        <div className="faq-answer">
          Absolutely, amplifying the pressure for swift action.
        </div>
      </div>
      <div className="faq-item">
        <b className="faq-question">What happens after filing?</b>
        <div className="faq-answer">
          We lodge your complaint officially with the Indian Consumer Helpline and the company itself, doubling down on getting you a resolution.
        </div>
      </div>
      <div className="faq-item">
        <b className="faq-question">Can I pull my complaint back?</b>
        <div className="faq-answer">
          Yes, if you’re satisfied or wish to retract, just say the word.
        </div>
      </div>
      <div className="faq-item">
        <b className="faq-question">Who sees my issue?</b>
        <div className="faq-answer">
          The world, plus we go the extra mile by notifying the Indian Consumer Helpline and the concerned company.
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;