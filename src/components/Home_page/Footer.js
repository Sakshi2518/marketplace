import React, { useState } from "react";
import { Icon } from '@iconify-icon/react';
import { FaStar } from 'react-icons/fa';


export default function Footer() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleRatingSubmit = () => {
        setSubmitted(true); // Set submitted to true to indicate the rating has been submitted
    };

    return (   
        <div id="contact-section"> 
            <div className="contact-info">
                <div className="contact-heading">
                    <h1>Got doubts? We're here to help!"</h1>
                    <div className="contact-mail">
                        <h2>Email id:</h2>
                        <span>abc@gmail.com</span>
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
                        <input  type="text" required placeholder="Name" />
                        <input  type="text" required placeholder="Name" />
                        <textarea rows={8} placeholder="Message" />
                        <button>Submit</button>
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
                        color={currentRating <= (hover || rating) ? "#34344d" : "#9eadcf"} // Adjusted condition
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                    />

                </label>
            );  
        })}
    </div>
    {rating !== null && !submitted && <button type="button" onClick={handleRatingSubmit}>Submit</button>}
    {submitted && rating !== null && <p>Thank you for your feedback!</p>} {/* Display "Thank You" message if submitted and rating is not null */}
</div>

        </div>
    );
}
