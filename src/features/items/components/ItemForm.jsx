import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

function getContactError(value){
  const trimmed = value.trim();
  if(!trimmed) return null;

  if(trimmed.includes("@")){
    return EMAIL_REGEX.test(trimmed) ? null : "Enter a valid email, e.g. name@example.com";
  }

  const isAllDigits = /^\d+$/.test(trimmed);
  if(isAllDigits){
    return INDIAN_PHONE_REGEX.test(trimmed) ? null : "Enter a valid 10-digit Indian mobile number";
  }

  return "Enter a valid email or a 10-digit Indian phone number";
}

export default function ItemForm({ onSubmit, isSubmitting, lockedType }) {
  const initialState = {
    title: "",
    type: lockedType || "Lost",
    location: "",
    contactMethod: "",
    date: "",
    description: "",
  };
  const [values, setValues] = useState(initialState);
  const [contactError, setContactError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if(name === "contactMethod") setContactError(null);
  }

  function handleContactBlur(){
    setContactError(getContactError(values.contactMethod));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const contactValidationError = getContactError(values.contactMethod);
    if(contactValidationError){
      setContactError(contactValidationError);
      return;
    }

    const payload = {
      title: values.title.trim(),
      type: values.type,
      location: values.location.trim(),
      contactMethod: values.contactMethod.trim(),
      ...(values.date ? { date: new Date(values.date).toISOString() } : {}),
      ...(values.description.trim() ? { description: values.description.trim() } : {}),
    };

    try {
      await onSubmit(payload);
      setValues(initialState);
    } catch {
      // toast already shown by useItems
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
          <input
            name="title"
            required
            value={values.title}
            onChange={handleChange}
            placeholder="e.g. Black Water Bottle"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
          />
        </div>

        {!lockedType && (
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
            <select
              name="type"
              required
              value={values.type}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
          <input
            name="location"
            required
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Central Library"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Contact method</label>
          <input
            name="contactMethod"
            required
            value={values.contactMethod}
            onChange={handleChange}
            onBlur={handleContactBlur}
            placeholder="email or 10-digit phone number"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
          />
          {contactError && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{contactError}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Date <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={3}
            placeholder="Any extra detail that helps identify the item"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        {isSubmitting ? "Submitting..." : "Submit report"}
      </button>
    </form>
  );
}