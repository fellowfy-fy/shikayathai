import old_man from "../../assets/old_man.svg";
import women from "../../assets/women.svg";
import safety from "../../assets/safety.svg";

const IntroSection = () => (
  <section className="lg:px-[80px] px-[24px] py-[20px] lg:pt-40 sm:pb-20 bg-white text-left sm:text-center">
    <div className="mb-8">
      <h1 className="text-[28px] lg:text-[64px] font-unbounded font-bold text-[#001A45]">
        File your complaint today to get your issue resolved
      </h1>
    </div>
    <div className="flex flex-col md:flex-row justify-around items-center text-center flex-wrap gap-8 mt-[24px] md:mt-[96px]">
      {[
        {
          image: old_man,
          subtitle: "Get refund for a product or a service",
          alt: "Man holding money",
        },
        {
          image: women,
          subtitle: "Replace Defective Products",
          alt: "People exchanging products",
        },
        {
          image: safety,
          subtitle: "Dispute Fraudulent Transaction",
          alt: "Computer with shield icon",
        },
      ].map((item, index) => (
        <div
          className="flex justify-center items-center flex-col max-w-xs"
          key={index}
        >
          <div className="h-[104px] w-[104px] lg:w-[200px] lg:h-[200px] bg-[#E6FFD2] rounded-full mb-4 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.alt}
              className="w-3/4 h-3/4 object-contain"
            />
          </div>
          <h3 className="text-[20px] md:text-[32px] font-inter font-bold mb-2 text-[#001A45]">
            {item.subtitle}
          </h3>
        </div>
      ))}
    </div>
  </section>
);

export default IntroSection;
