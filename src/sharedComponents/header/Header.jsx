const Header = () => {
  return (
    <header className="w-full max-w-screen-2xl mx-auto px-5 py-3 bg-darkBlue text-white">
      <section className="w-full max-w-7xl mx-auto font-inter">
        <div className="md:flex items-center justify-between">
          <div>
            <p className="text-4xl text-center md:text-left md:text-5xl font-girassol">
              Pixel News Everyday
            </p>
            <p className="text-center text-sm md:text-base uppercase">
              We providing this service since 2005
            </p>
          </div>
          <div>
            <button className="hidden md:flex flex-col items-center border border-darkFour rounded-xl px-5 py-2">
              <span className="text-xl md:text-2xl font-semibold uppercase">
                Subscribe Now
              </span>
              <span className="font-davidLibre text-base md:text-lg">
                Only $5 for a month
              </span>
            </button>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
