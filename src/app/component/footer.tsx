export default function Footer() {
  return (
    <>
      <div className='relative'>
        <div className="block  md:flex">
          <div className="w-full md:w-2/5 bg-colorGreen">
            <div className="flex items-center mx-10 md:mx-20 py-4 md:py-0  md:my-6">
              <img src="/footer-img/call-icon.png" alt="" />
              <p className="text-white pl-2">BOOK BY PHONE: <strong>0208 204 4444</strong></p>
            </div>
          </div>
          <div className="w-full md:w-3/5  bg-colorBlue fotr-blue">
            <div className="mx-20 py-6 md:py-0 md:my-5 ">
              <div className="block md:flex  ">
                <img className="w-1/2 md:w-3/4 h-full mx-auto" src="/footer-img/logo.png" alt="" />
                <div className="hidden md:block border-r-2 border-[#1053BB] h-20 ml-10 mr-7 mt-3"></div>
                <p className="text-white py-5 md:py-0 md:mb-3 text-md">offering a Minicasb service since 1996. Our service
                  is down to few things that we regard to be extremly
                  important, we always strive to offer the best value
                  for money to all our passengers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-colorBlue text-white py-9">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 px-7 space-y-4 md:space-y-0">
            <div>
              <h2 className="font-semibold pb-2">GET TO KNOW US</h2>
              <ul>
                <li className="text-sm">ABOUT US</li>
                <li className="text-sm">CONTACT US</li>
                <li className="text-sm">BLOG</li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold pb-2">MINICABS UK LTD</h2>
              <ul>
                <li className="text-sm">SERVICES</li>
                <li className="text-sm">OUR FLEET</li>
                <li className="text-sm">AREAS WE COVER</li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold pb-2">GET TO KNOW US</h2>
              <ul>
                <li className="text-sm">BECOME A DRIVER</li>
                <li className="text-sm">TERMS OF SERVICE</li>
                <li className="text-sm">PRIVACY POLICY</li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold pb-2">24/7 CONTROL ROOM</h2>
              <ul>
                <li className="text-sm">0208 204 4444</li>
                <li className="text-sm">bookings@mincabs.co.uk</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <img src="/footer-img/facebook-icon.png" alt="" />
            <img src="/footer-img/twitter-icon.png" alt="" />
            <img src="/footer-img/instagram-icon.png" alt="" />
            <img src="/footer-img/linkedin-icon.png" alt="" />
            <img src="/footer-img/youtube-icon.png" alt="" />
            <img src="/footer-img/whatsapp-icon.png" alt="" />
          </div>
        </div>
      </div>
      <div className="bg-[#012353] py-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 px-7">
            <div className="flex">
              <p className="text-sm text-[#88909B]">COOKIE POLICY - </p>
              <p className="text-sm text-[#88909B]"> FAQS</p>
            </div>
            <div>
              <p className="text-sm text-[#88909B]">Copyright © 2025 Minicabs.co.uk- -All Right Reserved</p>
            </div>
            <div>
              <img className="mx-auto" src="/footer-img/payment-options.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}