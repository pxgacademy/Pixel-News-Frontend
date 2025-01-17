import PropTypes from "prop-types";

const DashboardContainer = ({ children, header }) => {
  return (
    <section className="w-full">
      {header && (
        <div className="w-full min-h-24 px-5 bg-[url(../../assets/images/section-header-image.png)] flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase font-righteous cursor-default">
            {header}
          </h2>
        </div>
      )}
      <section className="w-full px-6 py-10 mx-auto font-inter">
        {children}
      </section>
    </section>
  );
};

DashboardContainer.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
};

export default DashboardContainer;
