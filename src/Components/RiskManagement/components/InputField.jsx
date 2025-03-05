export const InputField = ({ id, label, type = "text", placeholder, value, name, onChange, width = "w-full sm:w-96 md:w-80" }) => (
    <div className={`flex flex-col ${width}`}>
      <label htmlFor={id} className="font-medium mb-2 text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded outline-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
  