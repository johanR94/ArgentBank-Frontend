export default function Form({ fields, onSubmit, buttonText, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {}; // Create an object to hold form data
    fields.forEach((field) => {
      formData[field.name] = e.target[field.name].value; // Get the value of each field and store it in the formData object
    });
    onSubmit(formData);
  };

  return (
    // Form component that takes fields, onSubmit, buttonText, and children as props
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="input-wrapper" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder || ""}
            autoComplete={field.autoComplete || "on"}
          />
        </div>
      ))}
      {children}{" "}
      {/* Render any additional children passed to the Form component*/}
      <button className="sign-in-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
