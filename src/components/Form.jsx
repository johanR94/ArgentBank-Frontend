export default function Form({ fields, onSubmit, buttonText, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    fields.forEach((field) => {
      formData[field.name] = e.target[field.name].value;
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="input-wrapper" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder || ""}
          />
        </div>
      ))}
      {children}
      <button className="sign-in-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}