import crown from "../../assets/icons/crown.png";

const PremiumBadge = () => {
  return (
    <div className="absolute z-10 left-5 top-5 w-8 h-8 flex items-center justify-center bg-white p-1 rounded-full shadow-md">
      <img
        referrerPolicy="no-referrer"
        src={crown}
        className="rounded-full w-full h-full object-cover"
      />
    </div>
  );
};

export default PremiumBadge;
