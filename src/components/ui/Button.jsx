export function Button({ variant = "default", className = "", children, ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxford-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  
  const variantClasses = {
    default: "bg-oxford-blue text-white hover:bg-oxford-blue/90",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    // Add more variants as needed
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}