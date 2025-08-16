import Carousel from 'react-bootstrap/Carousel';

const ImageSlider = () => {
  return (
    <Carousel className="w-full">
      <Carousel.Item interval={2000}>
        <img
          className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
          src="https://hips.hearstapps.com/esquireuk.cdnds.net/16/28/1468579010-rare-pokemon-cards.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
          src="https://wp.technologyreview.com/wp-content/uploads/2019/05/27113726231c86ec4e01o-10.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
          src="https://beckett-www.s3.amazonaws.com/news/news-content/uploads/2020/01/Top-50-Cards-of-2010s.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="w-full h-[60vh] bg-center bg-no-repeat bg-cover "
          src="https://i0.wp.com/www.fivecardguys.com/wp-content/uploads/2019/07/mj23.jpg?fit=800%2C443&ssl=1"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageSlider;
