import crown from "../../assets/icons/crowns.jpg";

const PremiumBadge = () => {
  return (
    <div className="absolute left-3 top-3 w-12 h-12 shadow-lg rounded-full flex items-center justify-center">
      <img src={crown} className="rounded-full w-full h-full object-cover" />
    </div>
  );
};

export default PremiumBadge;
