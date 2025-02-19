import { Helmet } from "react-helmet";
import SectionContainer from "../../components/container/SectionContainer";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Pixel News</title>
      </Helmet>
      <SectionContainer header="Contact">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-10 mt-10">
          <form
            // onSubmit={handleSubmit}
            id="contact_form"
            className="flex flex-col space-y-2 p-5 lg:p-10 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl"
          >
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Your Name" required />
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Your Email" required />
            <label htmlFor="">Subject</label>
            <input type="text" placeholder="Subject" required />
            <label htmlFor="">Message</label>
            <textarea
              placeholder="Your Message"
              className="min-h-20 max-h-52"
              required
            />
            <label className="flex justify-center">
              <button
                type="submit"
                className="btn dark:bg-black/10 dark:border-black/10 dark:hover:bg-black/20 hover:scale-105 btn-wide mt-3"
              >
                Submit
              </button>
            </label>
          </form>

          <div className="mt-10 md:mt-0">
            <h3 className="text-2xl font-semibold mb-2">
              Get in Touch with Pixel News
            </h3>
            <p>
              Have questions, feedback, or partnership inquiries? Contact Pixel
              News today! Whether you're a reader, publisher, or administrator,
              we're here to assist you. Reach out to us for support,
              collaborations, or any inquiries about our platform. Let’s shape
              the future of news together!
            </p>

            <div className="mt-10 space-y-2">
              <div className="flex items-center gap-x-2">
                <span className="p-3 border border-gray-300 dark:border-gray-700 rounded">
                  <FaPhoneAlt />
                </span>
                <span>01356 546 568</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="p-3 border border-gray-300 dark:border-gray-700 rounded">
                  <FaEnvelope />
                </span>
                <a href="mailto:info@trackandretrieve.com">
                  info@pixelnews.com
                </a>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="p-3 border border-gray-300 dark:border-gray-700 rounded"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="p-3 border border-gray-300 dark:border-gray-700 rounded"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                className="p-3 border border-gray-300 dark:border-gray-700 rounded"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Contact;
