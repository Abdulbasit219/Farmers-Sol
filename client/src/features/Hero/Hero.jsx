import FarmerBuyer from "../../assets/hero-img.png";
import bgHero from "../../assets/bgHero.png";
import Button from "../../components/ui/Button";
import { HashLink as Link } from "react-router-hash-link";

function Hero() {
  return (
    <div className="max-h-[850px] lg:max-h-[545px] sm:max-h-[850px] xs:max-h-[660px] xss:max-h-[630px] mx-auto overflow-hidden">
      <div
        className="grid lg:grid-cols-2  grid-cols-1 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        {/* Left Side */}
        <div className="flex flex-col justify-center px-4 xs:px-6 py-8 text-white mx-4 xs:mx-6">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
            Connecting Farmers to Reliable Markets with Contract Farming
          </h1>
          <p className="text-sm xs:text-base sm:text-lg font-medium mb-6">
            Secure agreements, transparent pricing, and timely payments — all in
            one platform.
          </p>

          <div className="flex flex-col xs:flex-row gap-4">
            <Link to="/login">
              <Button className="bg-[#D8F3DC] text-[#2D6A4F] hover:bg-white hover:cursor-pointer">
                Get Started
              </Button>
            </Link>
            <Link smooth to="/#about">
              <Button className="border border-white text-white hover:bg-white hover:text-[#2D6A4F] hover:cursor-pointer">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center items-end p-4">
          <img
            src={FarmerBuyer}
            className="h-full object-contain"
            alt="Farmer Buyer"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
