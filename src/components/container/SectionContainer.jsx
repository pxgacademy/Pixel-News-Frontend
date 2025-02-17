import PropTypes from "prop-types";
import useContextValue from "../../hooks/useContextValue";

const SectionContainer = ({ children, header }) => {
  const { isDark } = useContextValue();
  return (
    <section className={`${isDark && "dark"}`}>
      <section className="w-full max-w-screen-2xl mx-auto pb-5 md:pb-10 bg-[#FDF1D3]">
        {header && (
          <div className="w-full mx-auto px-5 min-h-24 bg-[url(../../assets/images/section-header-image.png)] bg-no-repeat bg-center bg-cover flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold uppercase font-righteous cursor-default">
              {header}
            </h2>
          </div>
        )}
        <section className="w-full max-w-[1420px] px-5 py-10 mx-auto  font-inter">
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
