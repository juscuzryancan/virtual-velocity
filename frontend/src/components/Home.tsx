import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ImageSlider, Contact } from "./";

const Home = ({ products }: any) => {
  return (
    <>
      <div id="home-top" className="flex flex-col items-center relative">
        <ImageSlider />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hero-text text-white">
          <div className="flex flex-col items-center content-center p-8 bg-black/80 rounded">
            <h1 className="text-5xl font-bold">Welcome to Virtual Traders</h1>
            <p className="font-bold text-xl">Buy Trading Cards Online</p>
            <Link
              className="text-white p-2 rounded-sm bg-blue-600"
              to="/products"
            >
              Start Trading
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 py-2">
          <h2>Find hundreds of the most rare trading cards available!</h2>
          <p>
            Virtual Traders specializes in the hard to find, extra special,
            trading cards and collectables.
          </p>

          <p>Simply search our database of cards</p>
          <p>Select the card you want</p>
          <p>Add the card to your cart</p>
          <p>And checkout secured with Stripe</p>
          <h2 className="text-3xl">Recently Updated Products</h2>
        </div>
      </div>

      <div className="flex justify-around">
        {products &&
          products
            .slice(0, 3)
            .map(
              ({
                category,
                price,
                name,
                id,
                imageURL,
                description,
                inStock,
              }: any) => {
                return (
                  <Card
                    key={id}
                    style={{
                      width: "45vh",
                      marginBottom: "5vh",
                      minHeight: "58rem",
                      boxShadow: "5px 5px 12px grey",
                    }}
                  >
                    <Card.Img
                      style={{ height: "65vh", width: "100%" }}
                      variant="top"
                      src={imageURL}
                    />
                    <Card.Body>
                      <Card.Title>
                        <b>Name:</b> {name}
                      </Card.Title>
                      <Card.Text>
                        <b>Description:</b> {description}
                      </Card.Text>
                      <Card.Text>
                        <b>Price:</b> ${price / 100.0}
                      </Card.Text>
                      <Card.Text>
                        <b>Category:</b> {category}
                      </Card.Text>
                      <Card.Text>
                        <b>In Stock:</b> {inStock ? "Yes" : "No"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              },
            )}
      </div>
      <div
        style={{ textAlign: "center", marginLeft: "25%", marginRight: "25%" }}
      >
        <h5 className="font-semibold">
          Don't see exactly what you want? No need to trip potato chip, the
          Virtual Trading crew has got you covered. Hop on over to our
          <Link to="/products"> products</Link> to view them all or shoot us an
          email for more information.
        </h5>
        <section id="contactTop">
          <Contact />
        </section>
      </div>
    </>
  );
};

export default Home;
