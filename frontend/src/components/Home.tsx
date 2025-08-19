import { ImageSlider, Contact } from "./";

const Home = () => {
  return (
    <>
      <div id="home-top" className="flex flex-col items-center">
        <ImageSlider />
        <div className="flex flex-col items-center gap-6 py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find hundreds of the most rare trading cards available!
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Virtual Traders specializes in the hard to find, extra special,
              trading cards and collectables.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-3xl mb-4">🔍</div>
                <p className="font-semibold text-gray-800">
                  Simply search our database of cards
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-3xl mb-4">🎯</div>
                <p className="font-semibold text-gray-800">
                  Select the card you want
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-3xl mb-4">🛒</div>
                <p className="font-semibold text-gray-800">
                  Add the card to your cart
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-3xl mb-4">🔒</div>
                <p className="font-semibold text-gray-800">
                  And checkout secured with Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default Home;
