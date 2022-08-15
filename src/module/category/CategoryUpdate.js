import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { status } from "utils/constants";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import slugify from "slugify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = Yup.object({
  name: Yup.string().required("Please enter your title."),
});

function CategoryUpdate() {
  let [searchParams, setSearchParams] = useSearchParams();
  const idCategory = searchParams.get("id");

  const navigate = useNavigate();

  const {
    control,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function getCategory() {
      try {
        const document = doc(db, "categories", idCategory);
        const response = await getDoc(document);
        reset(response.data());
      } catch (error) {
        toast.error(error);
      }
    }

    getCategory();
  }, [idCategory, reset]);
  const watchStatus = watch("status");
  const handleUpdateCategory = (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, {
      lower: true,
    });

    async function updateCategory() {
      try {
        const document = doc(db, "categories", idCategory);
        await updateDoc(document, {
          name: cloneValues.name,
          slug: cloneValues.slug,
          status: +cloneValues.status,
        });

        toast.success("Updated category successfully.");
        navigate("/manage/category");
      } catch (error) {
        toast.error(error);
      }
    }

    return updateCategory();
  };
  useEffect(() => {
    document.title = "Update category";
    if (Object.keys(errors).length > 0) {
      toast.error(errors[Object.keys(errors)[0]].message, {
        pauseOnHover: false,
        autoClose: 1000,
      });
    }
  }, [errors]);
  if (!idCategory) return;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`update category id:#${idCategory}`}
      ></DashboardHeading>

      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
}
export default CategoryUpdate;
