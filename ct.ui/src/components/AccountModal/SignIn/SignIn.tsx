import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SignInContract from "@models/SignInContract";
import useAccount from "@hooks/useAccount";
import { AccountActionTypes } from "@actions/AccountAction";
import { login } from "@api/accountApi";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@api/errorMessages";

const SignIn: React.FC<{ onSignInComplete: () => void }> = ({
  onSignInComplete,
}) => {
  const { account, dispatch } = useAccount();

  const [formData, setFormData] = useState<SignInContract>({
    Email: "",
    Password: "",
  });
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (apiErrorMessage) {
      setApiErrorMessage(null);
    }
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

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch({ type: AccountActionTypes.SIGN_IN, payload: data });
      console.log("Login Success:");
      console.log(data);
      onSignInComplete();
    },
    onError: (error) => {
      console.error("Login error:", error);
      console.error(getErrorMessage(error.message));
      setApiErrorMessage(getErrorMessage(error.message));
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = document.getElementById("Email") as HTMLInputElement;

    emailInput.setCustomValidity("");

    mutation.mutate(formData);

    setFormData({
      Email: "",
      Password: "",
    });
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

export default SignIn;
