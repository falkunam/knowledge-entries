"use client";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEntries } from "../hook/useEntries";
import { Entry } from "../type/entry";
import { useEffect, useRef, useState } from "react";

interface Props {
  onClose: () => void;
  initialValues?: Entry | null;
}

const EntryForm = ({ onClose, initialValues }: Props) => {
  const { addEntry, updateEntry } = useEntries();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(50, "Title must be at most 50 characters"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().when([], {
      is: () => !initialValues,
      then: (schema) => schema.required("Image is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  useEffect(() => {
    if (initialValues?.image) setPreview(initialValues.image);
    else setPreview(null);
  }, [initialValues]);

  const handleSubmit = (values: Entry, { resetForm }: any) => {
    const formData: Entry = {
      ...values,
      image: values.image || preview || "",
    };

    if (initialValues?.id) {
      updateEntry.mutate({ ...formData, id: initialValues.id });
    } else {
      addEntry.mutate(formData);
    }

    resetForm();
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreview(null);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues || { title: "", description: "", image: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className="space-y-5">
          {/* Title Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Field
              name="title"
              data-testid="title-input"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-3 text-gray-800 outline-none transition-all placeholder-gray-400"
              placeholder="Enter title"
            />
            <ErrorMessage
              name="title"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
               data-testid="description-input"
              rows={4}
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-3 text-gray-800 outline-none transition-all placeholder-gray-400 resize-none"
              placeholder="Write description..."
            />
            <ErrorMessage
              name="description"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                data-testid="image-input"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue("image", reader.result);
                      setPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-gray-500 text-sm">
                Click or drag an image to upload
              </span>
            </div>
            <ErrorMessage
              name="image"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Image Preview using next/image */}
          {preview && (
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-300 mt-2">
              <div className="relative w-full h-44">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="submit-btn"
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium tracking-wide hover:bg-cyan-700 active:scale-[0.98] transition-all shadow-sm"
          >
            {initialValues ? "Update Entry" : "Add Entry"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EntryForm;
