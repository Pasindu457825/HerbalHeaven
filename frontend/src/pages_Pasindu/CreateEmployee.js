import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SidebarWithBurgerMenu } from "../components/navBar";
import { Link } from "react-router-dom";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";

export default class CreatPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      jobrole: "",
      gender: "",
      mobile: "",
      nic: "",
      email: "",
      address: "",
      isAdmin: "",
      age: "",
      confirmation: false,
      errors: {},

      confirmation: false,
    };
  }

  // Validation functions
  validateName = () => {
    const { name } = this.state;
    if (!name) {
      return "Name is required";
    }

    // Check if the name contains any uppercase letters
    if (/[A-Z]/.test(name)) {
      return "Please enter name in lowercase letters";
    }

    return "";
  };

  validateJobrole = () => {
    const { jobrole } = this.state;
    if (!jobrole) {
      return "Job role is required";
    }
    return "";
  };

  validateGender = () => {
    const { gender } = this.state;
    if (!gender) {
      return "Gender is required";
    }
    return "";
  };

  validateMobile = () => {
    const { mobile } = this.state;
    if (!mobile) {
      return "Mobile number is required";
    }
    if (mobile.length !== 10) {
      return "Mobile number must be 10 digits";
    }
    return "";
  };

  validateNic = () => {
    const { nic } = this.state;
    if (!nic) {
      return "National ID is required";
    }
    if (nic.length !== 12 && nic.length !== 9) {
      return "National ID must be either 12 or 9 digits";
    }
    return "";
  };

  validateEmail = () => {
    let { email } = this.state;
    
    // Convert email to lowercase
    const originalEmail = email;
    email = email.toLowerCase();
    
    if (!email) {
      return "Email is required";
    }
    if (originalEmail !== email) {
      return "Please enter Email in lowercase letters";
    }
    if (!email.includes("@")) {
      return "Email must include @ symbol";
    }
    return "";
  };
  
  validateAddress = () => {
    let { address } = this.state;
    if (!address) {
        return "Address is required";
    }
    // Convert address to lowercase
    address = address.toLowerCase();
    
    if (this.state.address !== address) {
        return "Please enter the address in lowercase";
    }

    return "";
};

  validateAge = () => {
    const { age } = this.state;
    if (!age) {
      return "Age is required";
    }
    if (age < 18 || age > 60) {
      return "Age must be between 18 and 60";
    }
    return "";
  };

  handInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: "", // Clear previous error when the field is updated
      },
    });
  };
  handleIsAdminChange = (e) => {
    this.setState({
      isAdmin: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const errors = {
      name: this.validateName(),
      jobrole: this.validateJobrole(),
      gender: this.validateGender(),
      mobile: this.validateMobile(),
      nic: this.validateNic(),
      email: this.validateEmail(),
      address: this.validateAddress(),
      age: this.validateAge(),
    };

    // Check if any errors exist
    if (Object.values(errors).some((error) => error !== "")) {
      this.setState({ errors });
      return;
    }

    const { name, jobrole, gender, mobile, nic, email, address, age } =
      this.state;

    const data = {
      name: name,
      jobrole: jobrole,
      gender: gender,
      mobile: mobile,
      nic: nic,
      email: email,
      address: address,
      age: age,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "This will add a new Employee.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:8070/api/posts/post/save", data)
          .then((res) => {
            if (res.data.success) {
              this.setState({
                confirmation: true,
                name: "",
                jobrole: "",
                gender: "",
                mobile: "",
                nic: "",
                email: "",
                address: "",
                age: "",
              });
            }
          });
      }
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="create-post-bg ">
          <div className="relative flex justify-between">
            <SidebarWithBurgerMenu />

            <ProfileMenu />
          </div>
          <div className="m-4">
            <Breadcrumbs>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
              <Link to="#">
                <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                  <span>Dashboard</span>

                  <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                </li>
              </Link>
              <Link to="/emp">
                <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                  <span>Employee</span>

                  <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                </li>
              </Link>
              <Link to="/emp/add">
                <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                  <span>Add New Employee</span>

                  <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                </li>
              </Link>
            </Breadcrumbs>
          </div>
          {this.state.confirmation ? (
            (window.location.href = "/emp")
          ) : (
            <div class=" w-full max-w-[56rem] mx-auto mt-7 mb-7 ">
              <div class="relative flex flex-col rounded-xl bg-blue-gray-100 shadow-md opacity-90">
                <div class="relative grid px-1 py-1 m-1 overflow-center text-center text-white bg-gray-800 place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
                  <div class="h-1 p-8 mb-4 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      fill="currentColor"
                      aria-hidden="true"
                      class="w-10 h-10 text-white"
                    >
                      <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                    Add New Employee
                  </h5>
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="p-6">
                    <div class="block overflow-visible">
                      <div class="relative block w-full overflow-visible  !overflow-y-visible bg-transparent">
                        <form class="flex flex-col gap-4 mt-12">
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Employee Name</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <input
                                value={this.state.name}
                                type="text"
                                name="name"
                                placeholder="Enter Employee Name"
                                onChange={this.handInputChange}
                                className={`peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                                  errors.name ? "border-red-500" : ""
                                }`}
                              />
                              {errors.name && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.name}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.name && <div class=""></div>}
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Jobrole</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <select
                                value={this.state.jobrole}
                                type="text"
                                name="jobrole"
                                placeholder="Enter Jobrole"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.jobrole
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              >
                                <option value="">Select Job Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Technician">Technician</option>
                                <option value="Driver">Driver</option>
                                <option value="Worker">Worker</option>
                              </select>
                              {errors.jobrole && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.jobrole}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.jobrole && <div class=""></div>}
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Gender</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <select
                                value={this.state.gender}
                                type="text"
                                name="gender"
                                placeholder="Enter Gender"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.gender
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                              {errors.gender && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.gender}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.gender && <div class=""></div>}
                          <div>
                            <p class="block  mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Mobile</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <input
                                value={this.state.mobile}
                                type="number"
                                name="mobile"
                                placeholder="Enter Mobile Number"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.mobile
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              />
                              {errors.mobile && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.mobile}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.mobile && <div class=""></div>}
                          <div>
                            <p class="block  mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>National ID</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <input
                                value={this.state.nic}
                                type="number"
                                name="nic"
                                placeholder="Enter National ID"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.nic
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              />
                              {errors.nic && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.nic}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="block overflow-visible">
                      <div class="relative block w-full overflow-visible !overflow-x-visible !overflow-y-visible bg-transparent">
                        <form class="flex flex-col gap-4 mt-12">
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Email</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <input
                                value={this.state.email}
                                type="email"
                                name="email"
                                placeholder="Enter Employee Email"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.email
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              />
                              {errors.email && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.email}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.name && <div class=""></div>}
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Address</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <input
                                value={this.state.address}
                                type="text"
                                name="address"
                                placeholder="Enter Employee Address"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.address
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              />
                              {errors.address && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.address}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.name && <div class=""></div>}
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Age</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <input
                                value={this.state.age}
                                type="number"
                                name="age"
                                min={18}
                                max={60}
                                placeholder="Enter Age"
                                onChange={this.handInputChange}
                                class={`${
                                  errors.age
                                    ? "border-red-500"
                                    : "border-blue-gray-200"
                                }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                              />
                              {errors.age && (
                                <p className="text-red-500 ml-1 text-sm sans">
                                  {errors.age}
                                </p>
                              )}
                              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                            </div>
                          </div>
                          {errors.age && <div class=""></div>}
                          <div>
                            <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                              <label>Admin Status</label>
                            </p>
                            <div class="relative h-10 w-full min-w-[200px]">
                              <select
                                value={this.state.isAdmin}
                                name="isAdmin"
                                onChange={this.handleIsAdminChange}
                                class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              >
                                <option value="">Select Admin Status</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center  gap-4 mt-10">
                  <button
                    class="m-2 relative select-none rounded-lg bg-green-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    onClick={this.onSubmit}
                  >
                    &nbsp;
                    <i className="fas fa-user-plus mr-2"></i>Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}