import crown from "../../assets/icons/crown.png";

const PremiumBadge = () => {
  return (
    <div className="absolute left-3 top-3 w-12 h-12 flex items-center justify-center bg-white p-1 rounded-lg shadow-md">
      <img src={crown} className="rounded-full w-full h-full object-cover" />
    </div>
  );
};

export default PremiumBadge;
