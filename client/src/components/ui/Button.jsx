function Button({ children, className = '', ...props }) {
  const baseStyles = 'rounded-xl font-semibold transition-all duration-200';

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
