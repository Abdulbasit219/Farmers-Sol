function Card({ Icon, title, description, className = "" }) {
  return (
    <div
      className={`w-full p-4 rounded-xl shadow-md bg-white text-primary text-center hover:shadow-lg transition ${className}`}
    >
      <div className="w-12 h-12  bg-[#E5F3E3] font-bold mt-4 rounded-full flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon className="w-5 h-5" />}
      </div>

      <h1 className="text-base font-bold mt-4mb-1">{title}</h1>

      {description && <p className="text-sm mt-4 text-gray-700">{description}</p>}
    </div>
  );
}
export default Card;
