const Input = ({ value, onChange, className, type, ...props }) => {
  return (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      value={value}
      onChange={onChange}
      type={type || 'text'}
      {...props}
    />
  );
}

export default Input;
