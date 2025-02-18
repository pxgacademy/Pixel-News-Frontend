import PropTypes from "prop-types";
import useContextValue from "../../hooks/useContextValue";

const SectionContainer = ({ children, header }) => {
  const { isDark } = useContextValue();
  return (
    <section className={`${isDark && "dark"}`}>
      <section className="w-full max-w-screen-2xl mx-auto px-5 lg:px-10 bg-gray-50 dark:bg-base-200/50 text-gray-800 dark:text-gray-100">
        <section className="w-full max-w-[1420px] py-10 mx-auto font-inter">
        {header && (
          <div className="w-full mx-auto px-5 mb-10 min-h-24 bg-[url(../../assets/images/section-header-image.png)] bg-no-repeat bg-center bg-cover flex items-center justify-center rounded-xl overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase font-righteous cursor-default">
              {header}
            </h2>
          </div>
        )}
          {children}
        </section>
      </section>
    </section>
  );
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
};

export default SectionContainer;
