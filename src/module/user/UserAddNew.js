import { async } from "@firebase/util";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/images/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useUploadImageFS from "hooks/useUploadImageFS";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { roleUser, statusUser } from "utils/constants";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = Yup.object({
  fullname: Yup.string().required("Please enter your fullname."),
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please ennter your password"),
});

const UserAddNew = () => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: 1,
      role: 3,
    },
    resolver: yupResolver(schema),
  });

  const {
    setImage,
    setProgress,
    progress,
    image,
    handleSelectImage,
    handleDRemoveImage,
  } = useUploadImageFS(setValue, getValues);
  const watchStatus = watch("status");
  const watchRole = watch("role");

  const handleAddUser = (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.username = slugify(
      cloneValues.username || cloneValues.fullname,
      {
        lower: true,
        replacement: "",
      }
    );
    console.log(cloneValues);
    async function createUser() {
      try {
        await createUserWithEmailAndPassword(
          auth,
          cloneValues.email,
          cloneValues.password
        );
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          ...cloneValues,
          status: +cloneValues.status,
          role: +cloneValues.role,
          avatar: image || "/default-profile.png",
          createdAt: serverTimestamp(),
        });
        toast.success(
          `Create user with email ${cloneValues.email} successfully`
        );
        setProgress(0);
        setImage("");
        reset({
          fullname: "",
          username: "",
          email: "",
          image: "",
          password: "",
          status: 1,
          role: 3,
        });
      } catch (error) {
        toast.error(error);
      }
    }
    return createUser();
  };
  useEffect(() => {
    document.title = "Create new user";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="w-[300px] h-[300px] mx-auto rounded-full ">
          <Field>
            <Label>Upload</Label>
            <ImageUpload
              onChange={handleSelectImage}
              name="image"
              image={image}
              progress={progress}
              onClickRemove={handleDRemoveImage}
            ></ImageUpload>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === statusUser.Active}
                value={statusUser.Active}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === statusUser.Pending}
                value={statusUser.Pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === statusUser.Ban}
                value={statusUser.Ban}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === roleUser.Admin}
                value={roleUser.Admin}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === roleUser.Mod}
                value={roleUser.Mod}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === roleUser.User}
                value={roleUser.User}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disable={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
