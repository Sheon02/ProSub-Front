import { Link } from 'react-router-dom';

const AboutScreen = () => {
  return (
    <div className="min-h-screen bg-[#fbe9d0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#244855] sm:text-5xl mb-4">
            About Our Premium Account Service
          </h1>
          <p className="text-xl text-[#874f41]">
            Quality accounts at unbeatable prices
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#244855] to-[#90aead] p-8 text-[#fbe9d0]">
            <h2 className="text-3xl font-bold mb-4">Our Value Proposition</h2>
            <p className="text-lg opacity-90">
              We bridge the gap between premium service providers and cost-conscious users through bulk purchasing and strategic partnerships.
            </p>
          </div>

          {/* How We Offer Lower Prices */}
          <div className="p-8 border-b border-gray-200">
            <h3 className="text-2xl font-semibold text-[#244855] mb-6">Why Our Prices Are Lower</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#fbe9d0] flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-[#e64833]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Bulk Purchasing Power</h4>
                  <p className="text-[#874f41]">
                    We purchase premium accounts in large volumes directly from providers, securing significant discounts that we pass on to you.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#fbe9d0] flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-[#e64833]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Verified Authentic Accounts</h4>
                  <p className="text-[#874f41]">
                    Every account we provide is 100% legitimate, purchased through official channels, and activated by us personally.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#fbe9d0] flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-[#e64833]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">No Middlemen Markups</h4>
                  <p className="text-[#874f41]">
                    By dealing directly with providers and selling to you, we eliminate unnecessary markups in the supply chain.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#fbe9d0] flex items-center justify-center mr-4">
                  <svg className="h-6 w-6 text-[#e64833]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Efficient Distribution</h4>
                  <p className="text-[#874f41]">
                    Our streamlined activation process ensures you get premium access quickly without paying for the provider's customer support infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="p-8 border-b border-gray-200 bg-[#fbe9d0]">
            <h3 className="text-2xl font-semibold text-[#244855] mb-6">Our Process</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#244855] text-[#fbe9d0] font-bold">1</div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Bulk Acquisition</h4>
                  <p className="text-[#874f41]">
                    We negotiate directly with premium service providers to purchase accounts in volume at wholesale rates unavailable to individual consumers.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#244855] text-[#fbe9d0] font-bold">2</div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Quality Verification</h4>
                  <p className="text-[#874f41]">
                    Each account is thoroughly tested to ensure full functionality and premium access before being offered to our customers.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#244855] text-[#fbe9d0] font-bold">3</div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Customer Purchase</h4>
                  <p className="text-[#874f41]">
                    You select the premium service you need and complete your purchase through our secure platform.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#244855] text-[#fbe9d0] font-bold">4</div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[#244855] mb-2">Instant Activation</h4>
                  <p className="text-[#874f41]">
                    We manually activate your premium access, typically within minutes of purchase, and provide you with login credentials or activation instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-[#244855] mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-[#244855] mb-2">Are these accounts legal?</h4>
                <p className="text-[#874f41]">
                  Absolutely. We only work with providers that allow reselling under their terms of service. All accounts are obtained through legitimate channels.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-[#244855] mb-2">How can you offer such low prices?</h4>
                <p className="text-[#874f41]">
                  Our bulk purchasing model gives us access to volume discounts that aren't available to individual consumers. We maintain low overhead and pass the savings directly to you.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-[#244855] mb-2">What if I have issues with my account?</h4>
                <p className="text-[#874f41]">
                  While we don't provide the same level of support as the original providers, we do offer basic assistance with activation and can help troubleshoot common issues.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#fbe9d0] px-8 py-6 text-center">
            <h3 className="text-xl font-semibold text-[#244855] mb-4">Ready to Access Premium Services for Less?</h3>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#e64833] hover:bg-[#d1402b]"
            >
              Browse Available Subscriptions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;