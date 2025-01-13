import PropTypes from "prop-types";

const SectionContainer = ({ children }) => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-5 bg-[#E2E5DE]">
      <section className="w-full max-w-7xl mx-auto bg-darkFive">
        {children}
      </section>
    </section>
  );
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionContainer;
