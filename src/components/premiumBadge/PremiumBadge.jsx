import premiumIcon from "../../assets/icons/Premium.png";

const PremiumBadge = () => {
  return (
    <div className="absolute left-3 top-3 w-12 h-12 overflow-hidden rounded-full shadow-xl">
      <img
        className="w-full h-full object-cover"
        src={premiumIcon}
        alt="premium"
      />
    </div>
  );
};

export default PremiumBadge;
