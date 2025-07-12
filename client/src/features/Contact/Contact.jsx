import React from "react";
import { Mail, PhoneCall } from "lucide-react";

function Contact() {
  return (
    <div id="contact" className="bg-[#F0FDF4] py-16 px-4 sm:px-8 lg:px-24 my-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-[#2D6A4F]">Contact Us</h2>
          <p className="text-gray-700">
            We'd love to hear from you! Whether you’re a farmer or a buyer,
            feel free to reach out with any questions, feedback, or partnership
            inquiries.
          </p>

          <div className="flex items-start space-x-4">
            <Mail className="text-[#2D6A4F] mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <a
                href="mailto:support@sabzlink.com"
                className="text-gray-700 underline"
              >
                support@sabzlink.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <PhoneCall className="text-[#2D6A4F] mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-700">+92 300 0000000</p>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <form className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="How can we help you?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#2D6A4F] cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-[#245d41] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
