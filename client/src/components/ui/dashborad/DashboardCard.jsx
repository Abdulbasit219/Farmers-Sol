function DashboardCard({ title, value, icon, variant = "user" }) {
  const baseClasses =
    "rounded-xl p-6 text-center space-y-4 hover:shadow-md transition flex flex-col items-center cursor-pointer mb-2 text-primary bg-[#CDDBA9]";

  const userClasses = "w-full sm:w-[48%] text-green-700";
  const adminClasses = "w-full lg:w-[23%] md:flex-row gap-4 items-center";

  const text = variant === "admin" ? "" : "text-green-700";
  const valueStyle = variant === "admin" ? "" : "text-green-800";

  return (
    <div
      className={`${baseClasses} ${
        variant === "admin" ? adminClasses : userClasses
      }`}
    >
      <div className={`${text}`}>{icon}</div>
      <div>
        <h2 className={`text-xl font-semibold ${text}`}>{title}</h2>
        <p className={`text-3xl font-bold ${valueStyle}`}>{value}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
