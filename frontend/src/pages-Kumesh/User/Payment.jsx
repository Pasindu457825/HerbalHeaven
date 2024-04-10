import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, Button } from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../middleware/authContext";
import { SidebarWithBurgerMenu } from "../../components/navBar";
import { Link, useLocation } from "react-router-dom";
import "./Payment.css";
import card from "./img/card.png";
import paypal from "./img/paypal.png";
import amazon from "./img/amo.png";
import tic from "./img/tic.png";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    setCart(location.state.selectedCartItems);
  }, [location.state.selectedCartItems]);

  // Define the steps with their corresponding route paths
  const steps = [
    {
      icon: <ShoppingCartIcon className="h-5 w-5" color="green" />,
      path: "/user/cart",
    },
    {
      icon: <CurrencyDollarIcon className="h-5 w-5" color="green" />,
      path: "/user/payment",
    },
    { icon: <ArchiveBoxIcon className="h-5 w-5" />, path: "/address" },
  ];

  // Find the index of the current step based on the route path
  const activeStepIndex = steps.findIndex(
    (step) => location.pathname === step.path
  );

  //data insert part
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    fullname: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardholdername: "",
    cardnumber: "",
    expmonth: "",
    expyear: "",
    cvv: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    placeOrder();
    sendRequest()
      .then(() => {
        alert("Card details Validated successfully!");
        history("/address");
      })
      .catch((error) => {
        console.error("Error adding card details:", error);
      });
  };

  const placeOrder = async () => {
    await axios.post(
      "http://localhost:8070/api/orders/order/save",
      {
        total: calculateTotalBill(),
        shippingAddress: inputs.address,
        paymentStatus: "Paid",
        orderStatus: "Preparing",
        items: cart.map(({ name, price, quantity, image }) => ({
          name,
          price,
          quantity,
          image,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/cards", {
        fullname: String(inputs.fullname),
        address: String(inputs.address),
        city: String(inputs.city),
        zip: String(inputs.zip),
        country: String(inputs.country),
        cardholdername: String(inputs.cardholdername),
        cardnumber: String(inputs.cardnumber),
        expmonth: String(inputs.expmonth),
        expyear: String(inputs.expyear),
        cvv: String(inputs.cvv),
      })
      .then((res) => res.data);
  };
  // Function to calculate the total bill
  const calculateTotalBill = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="w-auto px-24 py-4 step">
      <SidebarWithBurgerMenu />
      <Stepper
        activeStep={activeStepIndex}
        isFirstStep={activeStepIndex === 0}
        isLastStep={activeStepIndex === steps.length - 1}
      >
        {steps.map((step, index) => (
          <Step key={index} isActive={index === activeStepIndex}>
            <Link to={step.path}>{step.icon}</Link>
          </Step>
        ))}
      </Stepper>
      <div className="Payment-full-box">
        <div className="Payment-full-box-set">
          <div>
            <h1 className="main-tpoic">Payment</h1>
            <p className="main-para">Choose payment method below</p>
            <div className="method-set">
              <div className="method-one method-box">
                <img src={tic} alt="tick" className="img-tic" />
                <img src={card} alt="card" className="img-paymt card-pay" />
                <p className="paymnt-topic">Pay With Credit Card</p>
              </div>
              <div
                className="method-two method-box"
                onClick={() => {
                  window.location.href = "/paypal";
                }}
              >
                <img
                  src={paypal}
                  alt="paypal"
                  className="img-paymt card-paypal"
                />
                <p className="paymnt-topic">Pay With pay pal</p>
              </div>
              <div className="method-three method-box">
                <img src={amazon} alt="amazon" className="img-paymt card-amo" />
                <p className="paymnt-topic">pay with amazon payments</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="method-set-card">
                <div className="bil-box">
                  <h1 className="main-topic-bil">
                    <span className="number">1</span>Biling Info
                  </h1>
                  <label className="paymnt-lable">FULL NAME</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="fullname"
                    placeholder="John Doe"
                    value={inputs.fullname}
                    onChange={handleChange}
                    required
                  ></input>
                  <br></br>
                  <label className="paymnt-lable">BILLING ADDRESS</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="address"
                    value={inputs.address}
                    onChange={handleChange}
                    placeholder="abc/25/abc"
                    required
                  ></input>
                  <br></br>
                  <div className="method-set-card-form">
                    <div>
                      <label className="paymnt-lable">CITY</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-two"
                        type="text"
                        name="city"
                        value={inputs.city}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      ></input>
                      <br></br>
                    </div>
                    <div>
                      <label className="paymnt-lable">ZIPCODE</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-two"
                        type="text"
                        name="zip"
                        value={inputs.zip}
                        onChange={handleChange}
                        placeholder="1234"
                        required
                      ></input>
                      <br></br>
                    </div>
                  </div>

                  <label className="paymnt-lable">COUNTRY</label>
                  <br></br>
                  <select
                    name="country"
                    id="country"
                    value={inputs.country}
                    onChange={handleChange}
                    required
                    className="paymnt-inpt"
                  >
                    <option value="" required disabled selected>
                      Select Country
                    </option>
                    <option value="afghanistan">Afghanistan</option>
                    <option value="albania">Albania</option>
                    <option value="brazil">Brazil</option>
                    <option value="canada">Canada</option>
                    <option value="denmark">Denmark</option>
                    <option value="egypt">Egypt</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="india">India</option>
                    <option value="sri_lanka">Sri Lanka</option>
                  </select>
                </div>
                <div className="bil-box">
                  <h1 className="main-topic-bil">
                    <span className="number">2</span>Credit Card Info
                  </h1>
                  <label className="paymnt-lable">CARDHOLDER NAME</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    value={inputs.cardholdername}
                    onChange={handleChange}
                    name="cardholdername"
                    placeholder="John Doe"
                    required
                  ></input>
                  <br></br>
                  <label className="paymnt-lable">CARD NUMBER</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    value={inputs.cardnumber}
                    onChange={handleChange}
                    name="cardnumber"
                    placeholder="5645-6456-7665-0456"
                    required
                  ></input>
                  <br></br>
                  <div className="method-set-card-form">
                    <div>
                      <label className="paymnt-lable">EXP MONTH</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-one"
                        type="month"
                        name="expmonth"
                        value={inputs.expmonth}
                        onChange={handleChange}
                        placeholder="Desember 10"
                        required
                      ></input>
                      <br></br>
                    </div>
                    <div>
                      <label className="paymnt-lable">EXP YEAR</label>
                      <br></br>
                      <input
                        className="paymnt-inpt-one"
                        type="number"
                        value={inputs.expyear}
                        onChange={handleChange}
                        id="expyear"
                        name="expyear"
                        required
                        placeholder="YYYY"
                        min="1900"
                        max="2100"
                      ></input>
                      <br></br>
                    </div>
                  </div>
                  <label className="paymnt-lable">CVV NUMBER</label>
                  <br></br>
                  <input
                    className="paymnt-inpt"
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={inputs.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    maxLength={3}
                    pattern="[0-9]*"
                  ></input>
                </div>
              </div>
              <h1 className="paypal-para2">
                Your Total Ammount :{" "}
                <span className="price-pay">{calculateTotalBill()}</span>
              </h1>

              <div className="end-btn">
                <button className="btn-pro">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
