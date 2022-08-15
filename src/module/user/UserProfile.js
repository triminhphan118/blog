import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/images/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useUploadImageFS from "hooks/useUploadImageFS";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "contexts/auth-context";
const schema = Yup.object({
  fullname: Yup.string().required("Please enter your fullname."),
  email: Yup.string()
    .email("Please enter email in valid")
    .required("Please ennter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please ennter your password"),
});

function UserProfile() {
  const { userInfo } = useAuth();
  const userID = userInfo?.id;
  const regexImage = /%2F(\S+)\?/gm;
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const imageName = regexImage.exec(getValues("avatar"));
  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDRemoveImage,
  } = useUploadImageFS(setValue, getValues, imageName);

  useEffect(() => {
    if (!userID) return;

    async function getUser() {
      try {
        const docRef = doc(db, "users", userID);
        const user = await getDoc(docRef);
        reset(user && user.data());
        const imageUrl = user.data().avatar;
        const imgUrl = regexImage.exec(imageUrl);
        imgUrl && setImage(imageUrl && imageUrl);
      } catch (error) {
        toast.error(error);
      }
    }
    getUser();
  }, [reset, userID]);
  const handleUpdateUser = (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.username = slugify(
      cloneValues.username || cloneValues.fullname,
      {
        replacement: "",
        lower: true,
      }
    );
    async function updateUser() {
      try {
        const docRef = doc(db, "users", userID);
        await updateDoc(docRef, {
          ...cloneValues,
          status: +cloneValues.status,
          role: +cloneValues.role,
          avatar: image || "/default-profile.png",
        });
        setProgress(0);
        // setImage("");
        // reset({
        //   fullname: "",
        //   username: "",
        //   email: "",
        //   password: "",
        //   image: "",
        //   status: 1,
        //   role: 3,
        // });
        toast.success("Update user successfully");
      } catch (error) {
        toast.error(error);
      }
    }
    return updateUser();
  };
  useEffect(() => {
    document.title = "update profile";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  return (
    <div>
      <div className="flex justitfy-bettwen">
        <DashboardHeading title="Update profile"></DashboardHeading>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
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
              disabled={true}
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
              disabled={true}
              placeholder="Enter your password"
              control={control}
              type="password"
            ></InputPasswordToggle>
          </Field>
        </div>

        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disable={isSubmitting}
        >
          Udpate profile
        </Button>
      </form>
    </div>
  );
}

export default UserProfile;
