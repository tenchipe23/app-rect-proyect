import React from 'react';

export interface SpecialOffer {
  title: string;
  description: string;
  image: string;
  discount: number;
}

interface SpecialOffersProps {
  title?: string;
  offers?: SpecialOffer[];
  onOfferClick?: (offer: SpecialOffer) => void;
}

const DEFAULT_OFFERS: SpecialOffer[] = [
  {
    title: 'Summer Clearance',
    description: 'Up to 50% off on clothing',
    image: '/assets/offers/summer-sale.jpg',
    discount: 50
  },
  {
    title: 'Tech Deals',
    description: 'Best gadgets at incredible prices',
    image: '/assets/offers/tech-sale.jpg',
    discount: 30
  }
];

const SpecialOffers: React.FC<SpecialOffersProps> = ({
  title = 'Special Offers',
  offers = DEFAULT_OFFERS,
  onOfferClick
}) => {
  const handleOfferClick = (offer: SpecialOffer) => {
    if (onOfferClick) {
      onOfferClick(offer);
    }
  };

  return (
    <section 
      className="
        bg-white 
        py-12 
        px-5
      "
    >
      <h2 
        className="
          text-center 
          mb-7.5 
          text-[#2c3e50] 
          font-medium 
          text-2xl
        "
      >
        {title}
      </h2>

      <div 
        className="
          grid 
          grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
          gap-7.5 
          justify-center
          max-md:grid-cols-1
        "
      >
        {offers.map((offer, index) => (
          <div 
            key={index}
            className="
              relative 
              overflow-hidden 
              rounded-lg 
              shadow-md 
              transition-transform 
              duration-300 
              ease-in-out 
              hover:scale-105 
              cursor-pointer
            "
            onClick={() => handleOfferClick(offer)}
          >
            <div className="relative">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="
                  w-full 
                  h-[250px] 
                  object-cover
                  max-md:h-[200px]
                "
              />
              
              <span 
                className="
                  absolute 
                  top-3.5 
                  right-3.5 
                  bg-[#e74c3c] 
                  text-white 
                  py-1 
                  px-2.5 
                  rounded-full 
                  font-bold
                "
              >
                {offer.discount}% OFF
              </span>
            </div>

            <div 
              className="
                p-5 
                bg-white
              "
            >
              <h3 
                className="
                  mb-2.5 
                  text-[#2c3e50] 
                  text-lg 
                  font-semibold
                "
              >
                {offer.title}
              </h3>
              
              <p className="text-gray-600">
                {offer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;

