export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold bg-indigo-500 hover:bg-indigo-600 ${className}`}
    >
      {children}
    </button>
  );
}
