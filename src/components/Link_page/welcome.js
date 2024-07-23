
import React from "react";

const WelcomeBack = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      position: "relative",
    },
    welcomeText: {
      fontSize: "48px",
      fontWeight: "bold",
      animation: "fadeIn 2s ease-in-out",
    },
    shopText: {
      fontSize: "24px",
      fontWeight: "normal",
      marginTop: "20px",
      animation: "slideIn 2s ease-in-out",
    },
    button: {
      marginTop: "30px",
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#ff6600",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    sticker: {
      width: "60px",
      height: "60px",
      position: "absolute",
      borderRadius: "50%",
      
    },
    sticker1: {
      top: "10%",
      left: "30%",
    },
    sticker2: {
      top: "40%",
      right: "10%",
    },
    sticker3: {
      bottom: "30%",
      left: "10%",
    },
    sticker4: {
      bottom: "10%",
      right: "30%",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Welcome Back!</h1>
      <p style={styles.shopText}>Today is a good day to shop</p>
    
        <button style={styles.button}>See Products</button>
    

      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker1 }}
      />
      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker2 }}
      />
      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker3 }}
      />
      <img
        src="https://i.etsystatic.com/15626339/r/il/b2b04c/3920480981/il_570xN.3920480981_d3kc.jpg"
        alt="Sticker"
        style={{ ...styles.sticker, ...styles.sticker4 }}
      />
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default WelcomeBack;
