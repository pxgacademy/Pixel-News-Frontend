const Footer = () => {
  return (
    <footer className="w-full max-w-screen-2xl mx-auto bg-darkBlue">
      <section className="px-5 py-10 lg:p-10">
        <div className="text-center text-white mb-6">
          <p className="text-3xl md:text-4xl font-girassol">
            Pixel News Everyday
          </p>
          <p className="text-sm uppercase">
            We providing this service since 2005
          </p>
        </div>
        <section className="footer w-full max-w-7xl mx-auto text-white">
          <div className="flex justify-between w-full">
            <nav className="flex flex-col">
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="flex flex-col">
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav className="flex flex-col">
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </div>

          <div className="flex justify-center w-full">
            <form onSubmit={(e) => e.preventDefault()}>
              <h6 className="footer-title">Newsletter</h6>
              <fieldset className="form-control w-80">
                <label className="label">
                  <span className="label-text text-white">
                    Enter your email address
                  </span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-bordered join-item text-darkTwo"
                  />
                  <button className="btn btn-primary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </section>
      </section>

      <div className="footer footer-center bg-base-300 text-base-content p-4">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Pixel
          News Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
