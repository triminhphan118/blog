import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import slugify from "slugify";
import { roleUser, statusUser, stautusUser } from "utils/constants";

const schemaValidation = Yup.object({
  fullName: Yup.string().required("Please enter your full name"),
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Pleaser ennter your password"),
});

function SignUpPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      const userNew = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
        photoURL: `/default-profile.png`,
      });
      // const colection = collection(db, "users");
      await setDoc(doc(db, "users", userNew?.user?.uid), {
        email: values.email,
        password: values.password,
        fullname: values.fullName,
        avatar: "/default-profile.png",
        status: statusUser.Active,
        role: roleUser.User,
        username: slugify(values.fullName, {
          lower: true,
          replacement: "",
          trim: true,
        }),

        createdAt: serverTimestamp(),
      });
      // await addDoc(colection, {});

      toast.success("Reigster successfully");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    document.title = "Register";

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
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field className="feild">
          <Label htmlFor="fullName" className="label">
            Fullname
          </Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            className="input"
            placeholder="Enter your fullname"
            control={control}
          />
        </Field>
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
          Do you already have an account ?{" "}
          <NavLink to="/sign-in">Login</NavLink>
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
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SignUpPage;
