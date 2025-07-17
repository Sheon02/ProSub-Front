const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleContactClick = () => {
    // Opens Gmail compose window with pre-filled recipient and subject
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=support@gmail.com&su=Premium Account Inquiry',
      '_blank'
    );
  };

  return (
    <div className="w-full py-4 bg-[#244855]">
      <div className="md:w-2/3 w-full px-4 text-[#fbe9d0] flex flex-col mx-auto">
        <div className="w-full text-5xl font-bold">
          <h1 className="w-full md:w-2/3">How can we help you? Get in touch</h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-[#fbe9d0]">
            We provide premium accounts at unbeatable prices through our bulk purchasing model. 
            Get verified, high-quality premium services at a fraction of the standard cost.
          </p>
          <div className="w-44 pt-6 md:pt-0">
            <button
              onClick={handleContactClick}
              className="bg-red-500 hover:bg-red-600 transition-colors duration-200 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center w-full"
              aria-label="Contact us via email"
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="mt-12">
          <hr className="border-gray-600"/>
          <div className="w-full text-center my-4 text-gray-600">
            <p>Copyright © {currentYear} Premium Accounts. All rights reserved.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;