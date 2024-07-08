import React, { useState } from "react";
import { Icon } from '@iconify-icon/react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

export default function Footer() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleRatingSubmit = () => {
        axios.post('http://localhost:4000/contact', { ...formData, rating })
            .then(response => {
                setSubmitted(true);
                // Optionally, reset form data or other state after successful submission
            })
            .catch(error => {
                console.error("There was an error sending the email!", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div id="contact-section">
            <div className="contact-info">
                <div className="contact-heading">
                    <h1>Got doubts? We're here to help!</h1>
                    <div className="contact-mail">
                        <h2>Email id:</h2>
                        <span>igmarketplace.help@gmail.com</span>
                    </div>
                    <div className="contact-socials">
                        <h2>Follow us on socials</h2>
                        <div className="contact-icons">
                            <Icon icon="akar-icons:instagram-fill" />
                            <Icon icon="teenyicons:linkedin-outline" />
                            <Icon icon="ri:twitter-x-line" />
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <form>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Email"
                        />
                        <textarea
                            rows={8}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Message"
                        />
                        <button type="button" onClick={handleRatingSubmit}>Submit</button>
                    </form>
                </div>
            </div>
            <div className="contact-feedback">
                <h2>Share your feedback with us!</h2>
                <div className="rating">
                    {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={currentRating}
                                    onClick={() => setRating(currentRating)}
                                />
                                <FaStar
                                    icon="bi:star-fill"
                                    className="star-icon"
                                    color={currentRating <= (hover || rating) ? "#34344d" : "#9eadcf"}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </div>
                {rating !== null && !submitted && <button type="button" onClick={handleRatingSubmit}>Submit</button>}
                {submitted && rating !== null && <p>Thank you for your feedback!</p>}
            </div>
        </div>
    );
}
