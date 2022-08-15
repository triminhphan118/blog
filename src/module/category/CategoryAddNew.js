import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { status } from "utils/constants";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = Yup.object({
  name: Yup.string().required("Please enter your name category."),
});

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
    resolver: yupResolver(schema),
  });
  const watchStatus = watch("status");
  const handleAddCategory = (values) => {
    if (!isValid) return;
    const clonevalues = { ...values };
    clonevalues.slug = slugify(values.slug || values.name, {
      lower: true,
    });

    async function addCategory() {
      try {
        const colRef = collection(db, "categories");
        await addDoc(colRef, {
          ...clonevalues,
          status: +clonevalues.status,
          createdAt: serverTimestamp(),
        });

        toast.success("Create category successfully.");
        reset({
          name: "",
          slug: "",
          status: 1,
        });
      } catch (error) {
        toast.error(error);
      }
    }

    return addCategory();
  };
  useEffect(() => {
    document.title = "Add new category";
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
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                value={status.Approved}
                checked={+watchStatus === status.Approved}
                onClick={() => setValue("status", status.Approved)}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={status.UnApproved}
                onClick={() => setValue("status", status.UnApproved)}
                checked={+watchStatus === status.UnApproved}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
          <Button
            kind="primary"
            className="mx-auto w-[250px] mt-4"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Add new category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
