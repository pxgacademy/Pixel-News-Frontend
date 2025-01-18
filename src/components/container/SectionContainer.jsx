import PropTypes from "prop-types";

const SectionContainer = ({ children, header }) => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto pb-5 md:pb-10 bg-[#FDF1D3]">
      {header && (
        <div className="w-full max-w-[1320px] mx-auto px-5 min-h-24 bg-[url(../../assets/images/section-header-image.png)] flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-righteous cursor-default">
            {header}
          </h2>
        </div>
      )}
      <section className="w-full max-w-[1320px] px-5 py-10 mx-auto  font-inter">
        {children}
      </section>
    </section>
  );
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
};

export default SectionContainer;
