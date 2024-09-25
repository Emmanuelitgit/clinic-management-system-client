import React, { useState } from 'react';
import PredictionSidebar from './Sidebar';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const HeartDisease = () => {
  const [features, setFeatures] = useState({
    Age: "",
    Sex: "",
    Cp: "",
    Trestbps: "",
    Chol: "",
    Fbs: "",
    Restecg: "",
    Thalach: "",
    Exang: "",
    Oldpeak: "",
    Slope: "",
    Ca: "",
    Thal: "",
});
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false)


  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setOpen(true)
    const formattedFeatures = Object.values(features).map(feature => parseFloat(feature));
  
    try {
      const response = await axios.post("https://disease-prediction-system-xk9h.onrender.com/api/heart-disease/predict/", 
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
    }finally{
      setOpen(false)
    }
  };
  

  return (
    <div className='prediction-container'>
      <PredictionSidebar />
      <div className={show? "prediction-form" : "prediction-forms"}>
      {show && 
        <Alert variant="success" 
         onClose={() => setShow(false)} 
         dismissible 
         style={{
          width:"80%", 
          marginTop:"5%",
        }
         }>
        <Alert.Heading>Below is your result.Thank you!</Alert.Heading>
        <p>
           {message}
        </p>
      </Alert>
        }
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
          {open && 
         <div>
         <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Processing...
         </div>
       }
       {!open &&  <span>Submit</span>}
        </Button>

        <br />
      </div>
    </div>
  );
};

export default HeartDisease;