
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styling
import "./App.css"; // Our custom calendar styles will be in here

// Stepper icons (blue/gray) - (No changes here)
const getStepperIcon = (type, active) => {
  const blue = "#0078d4";
  const gray = "#444851";
  switch (type) {
    case "postcode":
      return (
        <svg width="28" height="28" fill="none" viewBox="0 0 22 22">
          <circle cx="11" cy="9" r="3" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <path d="M11 20c3.5-4 7-7.5 7-11A7 7 0 1 0 4 9c0 3.5 3.5 7 7 11z" stroke={active ? blue : gray} strokeWidth="1.7"/>
        </svg>
      );
    case "waste":
      return (
        <svg width="28" height="28" fill="none" viewBox="0 0 22 22">
          <rect x="6" y="8" width="10" height="9" rx="2" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <path d="M4 8h14M9 8V6a2 2 0 0 1 4 0v2" stroke={active ? blue : gray} strokeWidth="1.7"/>
        </svg>
      );
    case "skip":
      return (
        <svg width="28" height="28" fill="none" viewBox="0 0 22 22">
          <rect x="2" y="8" width="9" height="6" rx="1" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <rect x="11" y="10" width="7" height="4" rx="1" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <circle cx="5.5" cy="17.5" r="1.5" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <circle cx="15.5" cy="17.5" r="1.5" stroke={active ? blue : gray} strokeWidth="1.7"/>
        </svg>
      );
    case "permit":
      return (
        <svg width="28" height="28" fill="none" viewBox="0 0 22 22">
          <path d="M11 19c5-2 7-5 7-9V5l-7-2-7 2v5c0 4 2 7 7 9z" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <path d="M11 10v3" stroke={active ? blue : gray} strokeWidth="1.7" strokeLinecap="round"/>
          <circle cx="11" cy="15" r="1" fill={active ? blue : gray}/>
        </svg>
      );
    case "calendar":
      return (
        <svg width="28" height="28" fill="none" viewBox="0 0 22 22">
          <rect x="4" y="6" width="14" height="12" rx="2" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <path d="M4 9h14" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <path d="M8 4v2M14 4v2" stroke={active ? blue : gray} strokeWidth="1.7"/>
        </svg>
      );
    case "payment":
      return (
        <svg width="28" height="28" fill="none" viewBox="0 0 22 22">
          <rect x="3" y="6" width="16" height="10" rx="2" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <path d="M3 9h16" stroke={active ? blue : gray} strokeWidth="1.7"/>
          <rect x="6" y="13" width="3" height="1.5" rx=".75" fill={active ? blue : gray}/>
        </svg>
      );
    default:
      return null;
  }
};

const steps = [
  { key: "postcode", label: "Postcode" },
  { key: "waste", label: "Waste Type" },
  { key: "skip", label: "Select Skip" },
  { key: "permit", label: "Permit Check" },
  { key: "calendar", label: "Choose Dates" },
  { key: "payment", label: "Payment" },
];

// Data (No changes here)
const skipSizes = [
  { name: "4 Yard Skip", price: "£120", period: 14, badge: "4 Yards", image: require("./4-yarder-skip.jpg"), subtitle: "Ideal for small domestic projects and garden clearances." },
  { name: "5 Yard Skip", price: "£135", period: 14, badge: "5 Yards", image: require("./5-yarder-skip.jpg"), subtitle: "Perfect for medium-sized home renovations and bulky waste." },
  { name: "6 Yard Skip", price: "£150", period: 14, badge: "6 Yards", image: require("./6-yarder-skip.jpg"), subtitle: "Popular for builders and general construction waste." },
  { name: "8 Yard Skip", price: "£180", period: 14, badge: "8 Yards", image: require("./8-yarder-skip.jpg"), subtitle: "Great for large house clearances and heavy waste." },
  { name: "10 Yard Skip", price: "£210", period: 14, badge: "10 Yards", image: require("./10-yarder-skip.jpg"), subtitle: "Suitable for bulky items and light construction waste." },
  { name: "12 Yard Skip", price: "£240", period: 14, badge: "12 Yards", image: require("./12-yarder-skip.jpg"), subtitle: "Ideal for large renovation projects and commercial use." },
  { name: "14 Yard Skip", price: "£270", period: 14, badge: "14 Yards", image: require("./14-yarder-skip.jpg"), subtitle: "Perfect for major building works and shop refits." },
  { name: "16 Yard Skip", price: "£300", period: 14, badge: "16 Yards", image: require("./16-yarder-skip.jpg"), subtitle: "Great for large volumes of light waste and packaging." },
  { name: "20 Yard Skip", price: "£350", period: 14, badge: "20 Yards", image: require("./20-yarder-skip.jpg"), subtitle: "Best for commercial projects and large clearances." },
  { name: "40 Yard Skip", price: "£450", period: 14, badge: "40 Yards", image: require("./40-yarder-skip.jpg"), subtitle: "Huge capacity for industrial and construction waste." },
];

const PERMIT_COST = 50; // A fixed cost for the permit

function StepperBar({ step }) {
  // (No changes here)
  return (
    <div className="stepper-bar">
      {steps.map((s, idx) => (
        <div
          className={`stepper-step${step === idx ? " active" : ""}${step > idx ? " done" : ""}`}
          key={s.key}
        >
          <span className="stepper-icon">{getStepperIcon(s.key, step >= idx)}</span>
          <span className="stepper-label">{s.label}</span>
          {idx < steps.length - 1 && <span className="stepper-divider" />}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [step, setStep] = useState(3); // Start at permit for demo
  const [selectedSkip, setSelectedSkip] = useState(skipSizes[3]); // Pre-select a skip for demo
  const [permit, setPermit] = useState("");
  const [placementPhoto, setPlacementPhoto] = useState(null); // State for the uploaded photo
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [collectionDate, setCollectionDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // State for card payment form
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSetDeliveryDate = (date) => {
    setDeliveryDate(date);
    setCollectionDate(null);
  };

  // Function to handle permit selection and reset photo
  const handlePermitChange = (newPermit) => {
    setPermit(newPermit);
    setPlacementPhoto(null); // Reset photo when changing permit option
  };

  // Function to handle photo selection
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPlacementPhoto(e.target.files[0]);
    }
  };
  
  // Function to remove selected photo
  const removePhoto = () => {
    setPlacementPhoto(null);
    const fileInput = document.getElementById('photo-upload-input');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const isCollectionDateDisabled = ({ date, view }) => {
    if (view === "month") {
      return !deliveryDate || date <= deliveryDate;
    }
    return false;
  };

  const calculateTotal = () => {
    if (!selectedSkip) return 0;
    const skipPrice = parseFloat(selectedSkip.price.replace("£", ""));
    const permitPrice = permit === "public" ? PERMIT_COST : 0;
    return (skipPrice + permitPrice).toFixed(2);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      alert("Emails do not match. Please check and try again.");
      return;
    }
    alert(`Thank you, ${customerName}! Your order is confirmed. A summary will be sent to ${email}.`);
    setIsConfirmModalOpen(false);
  };

  // Validation logic for buttons
  const isCardFormValid = cardName.trim() && cardNumber.trim() && expiryDate.trim() && cvc.trim();
  const isPayButtonDisabled = paymentMethod === 'card' && !isCardFormValid;
  const isModalFormValid = customerName.trim() && fatherName.trim() && email.trim() && confirmEmail.trim() && phoneNumber.trim() && email === confirmEmail;

  const slides = [
    <section className="active-section" key="postcode">{/* Unchanged */}</section>,
    <section className="active-section" key="waste">{/* Unchanged */}</section>,
    <section className="active-section skip-list-section" key="skip">{/* Unchanged */}</section>,
    // --- UPDATED PERMIT SECTION ---
    <section className="active-section" key="permit">
        <div className="section-header-container">
            <div className="section-header">{getStepperIcon("permit", step >= 3)}<span>Permit Check</span></div>
        </div>
        <p className="app-subtitle">Where will the skip be placed?</p>
        <div className="permit-options-2col permit-options-center">
            <div className={`permit-option-box${permit === "private" ? " selected" : ""} permit-mobile`} onClick={() => handlePermitChange("private")}>
                <label className="permit-label">
                    <input type="radio" name="permit" value="private" checked={permit === "private"} onChange={() => handlePermitChange("private")} />
                    <span><strong>Private Property</strong><div className="permit-subtitle">Driveway or private land</div></span>
                </label>
                <div className="permit-desc">No permit required when placed on your private property</div>
            </div>
            <div className={`permit-option-box${permit === "public" ? " selected" : ""} permit-mobile`} onClick={() => handlePermitChange("public")}>
                <label className="permit-label">
                    <input type="radio" name="permit" value="public" checked={permit === "public"} onChange={() => handlePermitChange("public")} />
                    <span><strong>Public Road</strong><div className="permit-subtitle">Council or public property</div></span>
                </label>
                <div className="permit-desc">Permit required for placement on public roads</div>
            </div>
        </div>

        {permit === "public" && (
            <div className="permit-extra-info-mobile">
                <div className="permit-extra-box permit-required-box">
                    <span className="permit-extra-title">Permit Required</span>
                    <span className="permit-extra-desc">A permit is required when placing a skip on a public road. We'll handle the permit application process for you.</span>
                </div>
                <div className="permit-extra-box permit-processing-box">
                    <span className="permit-extra-title">Processing Time</span>
                    <span className="permit-extra-desc">The council requires 5 working days notice to process permit applications. Please plan your booking accordingly.</span>
                </div>
            </div>
        )}

        {/* Photo Upload Section */}
        {permit && (
            <div className="photo-upload-container">
                <p className="photo-upload-desc">
                    Please provide a photo of where you plan to place the skip. This helps us ensure proper placement and identify any potential access issues.
                </p>
                {!placementPhoto ? (
                    <label htmlFor="photo-upload-input" className="photo-upload-label">
                        Choose Photo
                    </label>
                ) : (
                    <div className="photo-preview">
                        <span className="photo-preview-icon" role="img" aria-label="image icon">🖼️</span>
                        <span className="photo-preview-name">{placementPhoto.name}</span>
                        <button className="photo-remove-btn" onClick={removePhoto}>Remove</button>
                    </div>
                )}
                <input 
                    type="file" 
                    id="photo-upload-input" 
                    className="photo-upload-input" 
                    onChange={handlePhotoChange} 
                    accept="image/*" 
                />
                {permit === 'private' && (
                     <div className="skip-photo-text">Uploading a photo is optional for private property.</div>
                )}
                {permit === 'public' && (
                     <div className="skip-photo-text required">A photo is required for public roads.</div>
                )}
            </div>
        )}

        <div className="app-actions app-actions-sticky">
            <button className="app-btn" onClick={() => setStep(2)}>Back</button>
            <button className={`app-btn${(!permit || (permit === 'public' && !placementPhoto)) ? " disabled" : ""}`} disabled={!permit || (permit === 'public' && !placementPhoto)} onClick={() => setStep(4)}>
                Continue
            </button>
        </div>
    </section>,
    <section className="active-section" key="date">{/* Unchanged */}</section>,
    <section className="active-section" key="payment">{/* Unchanged */}</section>
  ];

  // Fill in the unchanged slides for brevity
  slides[0] = <section className="active-section" key="postcode">
      <div className="section-header-container"><div className="section-header">{getStepperIcon("postcode", true)}<span>Postcode</span></div></div>
      <input className="date-input" placeholder="E.g. SW1A 1AA" />
      <div className="app-actions app-actions-sticky"><button className="app-btn disabled" disabled>Back</button><button className="app-btn" onClick={() => setStep(1)}>Continue</button></div>
    </section>;
  slides[1] = <section className="active-section" key="waste">
      <div className="section-header-container"><div className="section-header">{getStepperIcon("waste", true)}<span>Waste Type</span></div></div>
      <div style={{ textAlign: "center", marginBottom: 24 }}><button className="app-btn" onClick={() => setStep(2)}>General Waste</button><button className="app-btn" style={{ marginLeft: 12 }} onClick={() => setStep(2)}>Construction Waste</button></div>
      <div className="app-actions app-actions-sticky"><button className="app-btn" onClick={() => setStep(0)}>Back</button><button className="app-btn" onClick={() => setStep(2)}>Continue</button></div>
    </section>;
  slides[2] = <section className="active-section skip-list-section" key="skip">
      <div className="skip-size-title">Choose Your Skip Size</div><div className="skip-size-subtitle">Select the skip size that best suits your needs</div>
      <div className="skip-grid">{skipSizes.map((skip) => (<div key={skip.name} className={`skip-card skip-grid-card${selectedSkip?.name === skip.name ? " selected" : ""}`} onClick={() => { if (selectedSkip?.name === skip.name) setSelectedSkip(null); else setSelectedSkip(skip);}} tabIndex={0} style={{ userSelect: "none" }}><div className="skip-badge">{skip.badge}</div><img src={skip.image} alt={skip.name} className="skip-image" /><div className="skip-details"><div className="skip-name">{skip.name}</div><div className="skip-period">{skip.period} day hire period</div><div className="skip-subtitle">{skip.subtitle}</div></div><div className="skip-price">{skip.price}</div><button className={`select-skip-btn${selectedSkip?.name === skip.name ? " selected" : ""}`} onClick={e => { e.stopPropagation(); if (selectedSkip?.name === skip.name) setSelectedSkip(null); else setSelectedSkip(skip); }} type="button">{selectedSkip?.name === skip.name ? "Selected" : "Select this skip"}</button></div>))}</div>
      {selectedSkip && (<div className="skip-fixed-continue-bar"><div className="skip-fixed-info"><span className="skip-fixed-name">{selectedSkip.name}</span><span className="skip-fixed-price">{selectedSkip.price}</span><span className="skip-fixed-period">{selectedSkip.period} days hire</span></div><button className="app-btn" onClick={() => setStep(3)}>Continue</button></div>)}
    </section>;
  slides[4] = <section className="active-section" key="date">
      <div className="section-header-container"><div className="section-header">{getStepperIcon("calendar", step >= 4)}
        <span>Choose Your Dates</span>
       </div></div>
         <span><h1>You Must Choose 1 day after the Delivery Date as a Collection Date.</h1></span>
      <div className="date-selection-container"><div className="calendar-wrapper"><h3 className="calendar-title">1. Select Delivery Date</h3><Calendar onChange={handleSetDeliveryDate} value={deliveryDate} minDate={new Date()} className="custom-calendar" /></div><div className="calendar-wrapper"><h3 className="calendar-title">2. Select Collection Date</h3><Calendar onChange={setCollectionDate} value={collectionDate} tileDisabled={isCollectionDateDisabled} className="custom-calendar" />{!deliveryDate && (<div className="calendar-overlay">Please select a delivery date first.</div>)}</div></div>
      <div className="app-actions app-actions-sticky"><button className="app-btn" onClick={() => setStep(3)}>Back</button><button className={`app-btn${deliveryDate && collectionDate ? "" : " disabled"}`} disabled={!deliveryDate || !collectionDate} onClick={() => setStep(5)}>Continue</button></div>
    </section>;
  slides[5] = <section className="active-section" key="payment">
      <div className="section-header-container"><div className="section-header">{getStepperIcon("payment", step >= 5)}<span>Confirm and Pay</span></div></div>
      <div className="payment-page-layout"><div className="order-summary-container"><h3 className="summary-title">Order Summary</h3><div className="summary-item"><span>Skip</span><span>{selectedSkip?.name} ({selectedSkip?.badge})</span></div><div className="summary-item"><span>Price</span><span>{selectedSkip?.price}</span></div><div className="summary-item"><span>Placement</span><span>{permit === 'public' ? 'Public Road' : 'Private Property'}</span></div>{permit === 'public' && (<div className="summary-item"><span>Permit Fee</span><span>£{PERMIT_COST.toFixed(2)}</span></div>)}<div className="summary-divider" /><div className="summary-item"><span>Delivery Date</span><span>{deliveryDate ? deliveryDate.toDateString() : 'N/A'}</span></div><div className="summary-item"><span>Collection Date</span><span>{collectionDate ? collectionDate.toDateString() : 'N/A'}</span></div><div className="summary-divider" /><div className="summary-total"><span>Total</span><span>£{calculateTotal()}</span></div></div><div className="payment-details-container"><h3 className="payment-title">Select Payment Method</h3><div className="payment-method-options"><button className={`payment-method-btn ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}><svg viewBox="0 0 22 22" fill="none" className="payment-method-icon"><rect x="3" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M3 9h16" stroke="currentColor" strokeWidth="1.7"/></svg><span>Card</span></button><button className={`payment-method-btn ${paymentMethod === 'google' ? 'selected' : ''}`} onClick={() => setPaymentMethod('google')}><svg viewBox="0 0 24 24" fill="none" className="payment-method-icon"><path d="M10.187 10.337L12 12.15l1.813-1.813a1.278 1.278 0 00-1.813-1.812z" fill="#34A853"/><path d="M13.812 10.337a1.278 1.278 0 10-1.812 1.812L12 12.15l-1.813-1.813a1.278 1.278 0 00-1.812 1.812L10.188 14.05l-2.6 2.6A1.278 1.278 0 009.4 18.463h5.2a1.278 1.278 0 00.9-2.188l-2.6-2.6z" fill="#4285F4"/><path d="M5.587 9.437A1.278 1.278 0 007.4 11.25L12 6.65l4.6 4.6a1.278 1.278 0 001.812-1.812L12.7 3.725a1.278 1.278 0 00-1.812 0L5.587 9.437z" fill="#EA4335"/><path d="M12 12.15l1.813 1.813 2.6-2.6a1.278 1.278 0 10-1.812-1.812L12 12.15z" fill="#FBBC04"/></svg><span>Google Pay</span></button><button className={`payment-method-btn ${paymentMethod === 'paypal' ? 'selected' : ''}`} onClick={() => setPaymentMethod('paypal')}><svg viewBox="0 0 24 24" fill="#fff" className="payment-method-icon"><path d="M3.32 10.235c.205-1.23.94-2.164 2.113-2.664C6.5 7.11 7.9 7 9.688 7h3.047c2.25 0 4.015.12 5.093.812 1.282.844 1.852 2.25 1.594 4.125-.21 1.547-1.046 2.766-2.437 3.516-1.391.75-3.11.984-5.063.984h-1.5c-.375 0-.672.062-.843.187-.172.125-.25.36-.234.656.031.516.328 1.016.813 1.266.421.219.984.312 1.687.312h.797c1.875 0 3.39-.422 4.547-1.265 1.062-.797 1.64-1.985 1.593-3.375a.73.73 0 00-.734-.703h-2.11a.573.573 0 00-.562.468c-.14.797-.625 1.344-1.375 1.594-.922.312-1.953.312-3.047.312h-.703c-1.22 0-2.14-.156-2.72-.515-.58-.36-.843-.875-.75-1.547.093-.672.5-1.156 1.125-1.406.625-.25 1.485-.39 2.531-.39h.516c2.438 0 4.297-.156 5.484-1.03 1.188-.876 1.766-2.282 1.5-4.266-.3-2.156-1.344-3.64-3.188-4.422-1.734-.734-4-.937-6.562-.937H9.688c-2.812 0-5.015.422-6.42 1.594C1.985 5.92 1.3 7.64 1.22 9.672c-.016.312.219.562.531.562h1.625a.31.31 0 00.313-.297L3.32 10.234z"/></svg><span>PayPal</span></button></div>{paymentMethod === 'card' && (<div className="payment-form-container"><div className="form-group"><label htmlFor="cardName">Name on Card</label><input id="cardName" type="text" className="form-input" placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)} /></div><div className="form-group"><label htmlFor="cardNumber">Card Number</label><input id="cardNumber" type="text" className="form-input" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={e => setCardNumber(e.target.value)} /></div><div className="form-row"><div className="form-group"><label htmlFor="expiryDate">Expiry Date</label><input id="expiryDate" type="text" className="form-input" placeholder="MM/YY" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} /></div><div className="form-group"><label htmlFor="cvc">CVC</label><input id="cvc" type="text" className="form-input" placeholder="123" value={cvc} onChange={e => setCvc(e.target.value)} /></div></div></div>)}{paymentMethod === 'google' && (<div className="payment-placeholder"><p>After clicking the button below, you will be redirected to Google to complete your payment securely.</p></div>)}{paymentMethod === 'paypal' && (<div className="payment-placeholder"><p>After clicking the button below, you will be redirected to PayPal to complete your payment securely.</p></div>)}</div></div><div className="app-actions app-actions-sticky"><button className="app-btn" onClick={() => setStep(4)}>Back</button><button className={`app-btn${isPayButtonDisabled ? " disabled" : ""}`} disabled={isPayButtonDisabled} onClick={() => setIsConfirmModalOpen(true)}>{paymentMethod === 'card' ? `Pay £${calculateTotal()}` : `Continue with ${paymentMethod === 'google' ? 'Google Pay' : 'PayPal'}`}</button></div></section>;

  return (
    <div className="fullscreen-app">
      <StepperBar step={step} />
      <div className="slides-wrapper">
        <div className="slide">
          {slides[step]}
        </div>
      </div>

      {isConfirmModalOpen && (
        <div className="modal-overlay" onClick={() => setIsConfirmModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Confirm Your Details</h3>
              <button className="modal-close-btn" onClick={() => setIsConfirmModalOpen(false)}>×</button>
            </div>
            <form id="confirmation-form" onSubmit={handleConfirmOrder}>
              <div className="modal-body">
                <p className="modal-subtitle">Please provide your details for order tracking and confirmation.</p>
                <div className="form-group">
                  <label htmlFor="customerName">Full Name</label>
                  <input id="customerName" type="text" className="form-input" placeholder="e.g. John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Father's Name</label>
                  <input id="fatherName" type="text" className="form-input" placeholder="e.g. Richard Doe" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmEmail">Confirm Email Address</label>
                  <input id="confirmEmail" type="email" className="form-input" placeholder="you@example.com" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input id="phoneNumber" type="tel" className="form-input" placeholder="e.g. 07123456789" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
              </div>
              <div className="modal-footer">
                <button className={`app-btn${!isModalFormValid ? " disabled" : ""}`} type="submit" disabled={!isModalFormValid}>
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
