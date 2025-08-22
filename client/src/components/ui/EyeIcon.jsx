import { Eye, EyeOff } from "lucide-react";

function EyeIcon({ visible, toggle }) {
  return (
    <div
      onClick={toggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer text-lg"
    >
      {visible ? <EyeOff /> : <Eye />}
    </div>
  );
}

export default EyeIcon;
