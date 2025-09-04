import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import SignUpContract from "@models/SignUpContract";
import { AccountActionTypes } from "@actions/AccountAction";
import useAccount from "@hooks/useAccount";
import { getErrorMessage } from "@api/errorMessages";
import { useMutation } from "@tanstack/react-query";
import { register } from "@api/accountApi";

const SignUp: React.FC<{ onSignUpComplete: () => void }> = ({
  onSignUpComplete,
}) => {
  //const { account, dispatch } = useAccount();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

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
    setApiErrorMessage(null);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "Email") {
      const emailInput = document.getElementById("Email") as HTMLInputElement;
      emailInput.setCustomValidity("");
    }

    if (id === "ConfirmPassword" || id === "Password") {
      const confirmInput = document.getElementById(
        "ConfirmPassword"
      ) as HTMLInputElement;
      confirmInput.setCustomValidity("");
    }
  };

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("Form submitted:", formData);
      console.log("Register Success:");
      console.log(data);
      setFormData({
        Name: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        DefaultPhone: "",
        DefaultAddress: "",
      });
      onSignUpComplete();
      setApiErrorMessage(null);
    },
    onError: (error) => {
      console.error("Register error:", error);
      console.error(getErrorMessage(error.message));
      setApiErrorMessage(getErrorMessage(error.message));
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmInput = document.getElementById(
      "ConfirmPassword"
    ) as HTMLInputElement;

    const emailInput = document.getElementById("Email") as HTMLInputElement;

    if (formData.Password !== formData.ConfirmPassword) {
      confirmInput.setCustomValidity("Passwords do not match");
      confirmInput.reportValidity();
      return;
    }

    confirmInput.setCustomValidity("");
    emailInput.setCustomValidity("");

    mutation.mutate(formData);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldContainer}>
          <label htmlFor="Name">Name:</label>
          <input
            className={styles.input}
            type="text"
            id="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="Email">Email:</label>
          <input
            className={styles.input}
            type="email"
            id="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="Password">Password:</label>
          <input
            className={styles.input}
            type="password"
            id="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="ConfirmPassword">Confirm Password:</label>
          <input
            className={styles.input}
            type="password"
            id="ConfirmPassword"
            placeholder="Confirm Password"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="DefaultPhone">Default Phone:</label>
          <input
            className={styles.input}
            type="tel"
            id="DefaultPhone"
            placeholder="Default Phone"
            value={formData.DefaultPhone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.fieldContainer}>
          <label htmlFor="DefaultAddress">Default Address:</label>
          <input
            className={styles.input}
            type="text"
            id="DefaultAddress"
            placeholder="Default Address"
            value={formData.DefaultAddress}
            onChange={handleChange}
          />
        </div>
        {apiErrorMessage && (
          <label className={styles.exception}>{apiErrorMessage}</label>
        )}
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
