import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import SignUpContract from "@models/SignUpContract";

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpContract>({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    DefaultPhone: "",
    DefaultAddress: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", formData);

    setFormData({
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      DefaultPhone: "",
      DefaultAddress: "",
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Sign Up</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.ConfirmPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Default Phone:</label>
        <input
          type="tel"
          id="phone"
          placeholder="Default Phone"
          value={formData.DefaultPhone}
          onChange={handleChange}
        />

        <label htmlFor="address">Default Address:</label>
        <input
          type="text"
          id="address"
          placeholder="Default Address"
          value={formData.DefaultAddress}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
