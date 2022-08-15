import { useAuth } from "contexts/auth-context";
import { Button } from "components/button";
import { Field } from "components/field";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Input } from "components/input";
import { Label } from "components/label";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "./AuthLayout";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import InputPasswordToggle from "components/input/InputPasswordToggle";

const schemaValidation = Yup.object({
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Pleaser ennter your password"),
});

function SingInPage() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success("Login success.");
    navigate("/");
  };

  useEffect(() => {
    document.title = "Login";
    if (userInfo?.email) navigate("/");
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  return (
    <AuthLayout>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field className="feild">
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Enter your email"
            control={control}
          />
        </Field>
        <Field className="feild">
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Do not have an account ? <NavLink to={"/sign-up"}>Register</NavLink>
        </div>
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          style={{
            width: "300px",
            margin: "0 auto",
          }}
        >
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SingInPage;
