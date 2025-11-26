export default function Input({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm text-white/80 mb-1 block">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg 
          bg-white/20 border border-white/10 
          backdrop-blur-md
          focus-within:ring-2 focus-within:ring-indigo-400
          ${className}
        `}
      >
        {Icon && <Icon size={18} className="text-white/80" />}

        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-transparent text-white outline-none placeholder-white/50"
        />
      </div>
    </div>
  );
}
