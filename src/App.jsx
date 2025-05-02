import { useState } from "react";
import "./App.css";

function App({ height, width, color, fontSize, borderRadius, type, onChange ,required,label}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // Function to handle validation
  const validateInput = (value, type) => {
    switch (type) {
      case "email":
        // Simple email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          setError("Please enter a valid email.");
        } else {
          setError("");
        }
        break;
      case "number":
        // Check if value is a valid number
        if (isNaN(value)) {
          setError("Please enter a valid number.");
        } else {
          setError("");
        }
        break;
      case "password":
        // Check for a minimum length password (you can enhance this)
        if (value.length < 6) {
          setError("Password must be at least 6 characters.");
        } else {
          setError("");
        }
        break;
      case "text":
      default:
        // Check if the text input is not empty
        if (value.trim() === ""&&required) {
          setError("This field cannot be empty.");
        } else {
          setError("");
        }
        break;
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    validateInput(inputValue, type);
    onChange(e); 
  };

  return (
    <div className="input-div">
      <label >{label??"label"}</label>
      <input
        {...(type && { type })}
        style={{ height, width, color, fontSize, borderRadius }}
        value={value}
        onChange={handleChange}
        className="input"
       
      />
      {error && <p className="p-tag">{error}</p>}
    </div>
  );
}

export default App;

