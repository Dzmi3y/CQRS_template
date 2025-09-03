import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SignInContract from "@models/SignInContract";
import useAccount from "@hooks/useAccount";
import { AccountActionTypes } from "@actions/AccountAction";

const SignIn: React.FC<{ onSignInComplete: () => void }> = ({
  onSignInComplete,
}) => {
  const { account, dispatch } = useAccount();

  const [formData, setFormData] = useState<SignInContract>({
    Email: "",
    Password: "",
  });

  const checkEmail: (email: string) => boolean = (email: string) => {
    return email !== "test@test.com";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "Email") {
      const emailInput = document.getElementById("Email") as HTMLInputElement;
      emailInput.setCustomValidity("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = document.getElementById("Email") as HTMLInputElement;

    if (checkEmail(formData.Email)) {
      emailInput.setCustomValidity("Email don't exist");
      emailInput.reportValidity();
      return;
    }

    emailInput.setCustomValidity("");
    dispatch({ type: AccountActionTypes.SIGN_IN, payload: formData });

    console.log("Form submitted:", formData);
    setFormData({
      Email: "",
      Password: "",
    });

    onSignInComplete();
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Sign In</div>
      <form onSubmit={handleSubmit}>
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
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
