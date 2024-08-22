import React, { useState } from 'react';
import PredictionSidebar from './Sidebar';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const Diabetes = () => {
  const [features, setFeatures] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);


  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const formattedFeatures = Object.values(features).map(feature => parseFloat(feature));
  
    try {
      const response = await axios.post("https://disease-prediction-system-xk9h.onrender.com/api/diabetes/predict/", 
        {
        features: formattedFeatures
      }, 
      {
        withCredentials: true  // Add this line to include credentials
    },
     {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if(response.status === 200){
        setMessage(response.data.message)
        setShow(true)
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  

  return (
    <div className='prediction-container'>
      <PredictionSidebar />
      <div className="prediction-forms">
        {/* <h1>Diabetes Interpreter</h1>
        <h4 style={{ fontSize: '18px' }}>
          Kindly fill the following input fields with the appropriate values and hit the submit button.
        </h4> */}
        <Form style={{ display: "flex", flexWrap: 'wrap' }}>
          {Object.keys(features).map((feature, index) => (
            <Form.Group key={index} className="mb-3" style={{ width: "30%", margin: "1%" }}>
              <Form.Label>{feature}</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter ${feature}`}
                name={feature}
                value={features[feature]}
                onChange={handleChange}
                style={{ padding: "6.5%" }}
              />
            </Form.Group>
          ))}
        </Form>
        <Button
          variant="primary"
          type="button"
          style={{ width: "30%", padding: "0.7%", border: 'none', outline: 'none' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <br />
        {show && 
        <Alert variant="danger" 
         onClose={() => setShow(false)} 
         dismissible 
         style={{
          width:"50%", 
          marginTop:"5%",
        }
         }>
        <Alert.Heading>Below is your result.Thank you!</Alert.Heading>
        <p>
           {message}
        </p>
      </Alert>
        }
      </div>
    </div>
  );
};

export default Diabetes;