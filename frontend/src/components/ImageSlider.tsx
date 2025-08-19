import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";

const ImageSlider = () => {
  return (
    <div className="relative">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            <img
              className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
              src="https://hips.hearstapps.com/esquireuk.cdnds.net/16/28/1468579010-rare-pokemon-cards.jpg"
              alt="First slide"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <img
              className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
              src="https://wp.technologyreview.com/wp-content/uploads/2019/05/27113726231c86ec4e01o-10.jpg"
              alt="Third slide"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <img
              className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
              src="https://beckett-www.s3.amazonaws.com/news/news-content/uploads/2020/01/Top-50-Cards-of-2010s.jpg"
              alt="Third slide"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
              src="https://i0.wp.com/www.fivecardguys.com/wp-content/uploads/2019/07/mj23.jpg?fit=800%2C443&ssl=1"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 w-full px-4">
        <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-black/85 rounded-xl backdrop-blur-sm border border-slate-600/50 shadow-2xl max-w-md md:max-w-lg mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 text-center leading-tight">
            Welcome to Virtual Traders
          </h1>
          <p className="font-medium text-sm md:text-lg mb-3 md:mb-4 text-center text-gray-300">
            Buy Trading Cards Online
          </p>
          <Link
            className="text-white px-4 py-2 md:px-6 md:py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-300 font-medium shadow-lg text-sm md:text-base"
            to="/products"
          >
            Start Trading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
