import PropTypes from "prop-types";

const SectionContainer = ({ children }) => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto bg-darkFive">
      <section className="w-full max-w-[1320px] px-5 mx-auto bg-[#E2E5DE] py-10 font-inter">
        {children}
      </section>
    </section>
  );
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionContainer;
