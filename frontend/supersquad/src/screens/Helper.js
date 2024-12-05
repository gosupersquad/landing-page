import ProfilePicUser from "../resources/images/home/profile_pic_user.svg";
import ReviewImg from "../resources/images/home/review_img.svg";

export const faq = [
  {
    id: "faq-0",
    question: "What is Supersquad?",
    answer:
      "Supersquad offers a variety of themed trips hosted by popular creators which can be seamlessly booked via our website. A trusted trip leader will ensure your experience is smooth throughout the trip.",
  },
  {
    id: "faq-1",
    question: "Will I get to meet the creator?",
    answer:
      "Yes, the creators who host the trips will travel along with you on these trips.",
  },
  {
    id: "faq-2",
    question: "I am a creator. How can I join?",
    answer: (
      <div>
        We are always on a lookout for inspiring creators who can host a
        memorable experience for their community. Click here to go to the{" "}
        <a href="/creator/signup">Become a host page.</a>
      </div>
    ),
  },
  {
    id: "faq-3",
    question: "Are these group trips or private trips?",
    answer:
      "All trips on Supersquad are group trips that are designed to foster a sense of community among like-minded people.",
  },
  {
    id: "faq-4",
    question: "Are flights included in the price?",
    answer:
      "No, the flights are not included in the price. Every trip page has a clear list of inclusions and exclusions.However, you can reach out to us here in case you need assistance in booking flights.",
  },
  {
    id: "faq-5",
    question: "Can I call to book a trip?",
    answer:
      "You can book a trip with Supersquad by clicking the “Book Now” button on the trip page. The trip page contains all the necessary trip details required to book the trip. Additionally, you can also reach out to us on Email or Whatsapp to further ask us about the trips and book them.",
  },
  {
    id: "faq-6",
    question: "What are the payment options available?",
    answer:
      "We use Juspay, a trusted payment partner to collect payments. You can use credit card, debit card, UPI, Netbanking, EMI or Wallet to pay us.",
  },
  {
    id: "faq-7",
    question: "Can I pay in parts?",
    answer:
      "Absolutely! You can pay for your trip in convenient instalments that accommodate your budget. Flexible payment plans are created on a per trip basis. See trip pages for more details.",
  },
  {
    id: "faq-8",
    question: "Can I cancel my booked trip?",
    answer:
      "We understand that plans can change. Please refer to the cancellation policy on each trip page for details on refunds and rescheduling options.",
  },
  {
    id: "faq-9",
    question: "Are the trips for solo travellers or couples?",
    answer:
      "Everyone is free to book Supersquad’s trips. Whether you are a solo-traveller looking to meet like-minded individuals or couples looking to experience things together, our trips ensure there’s something for everyone.",
  },
  {
    id: "faq-10",
    question: "Can I customise my trip?",
    answer:
      "Since the core itinerary is designed to ensure a cohesive group experience, it is mostly uncustomizable. However, there may be opportunities to extend your trip. Please get in touch with us on Email or Whatsapp to discuss customization and extension.",
  },
  {
    id: "faq-11",
    question: "What about my safety during the trip?",
    answer:
      "The safety and well-being of our travelers are our top priority. We follow all local guidelines and regulations, and our team is trained to handle any emergencies that may arise. All our trips come with a trusted trip leader who’s top priority is the safety of travellers and creators.",
  },
  {
    id: "faq-12",
    question: "How can I be notified about your upcoming trips?",
    answer:
      "Follow us on Instagram to receive the latest updates on upcoming trips and exclusive offers.",
  },
  {
    id: "faq-13",
    question: "I have more questions. How can I connect?",
    answer: "Reach out to us on Email, Whatsapp and on Phone.",
  },
];

export const whys = [
  {
    id: "why-0",
    header: "Unique Experiences",
    description:
      "Exclusive handpicked trips across the world packed with experiences that cater to your interest.",
  },
  {
    id: "why-1",
    header: "Make New Connections",
    description:
      "Travel with like-minded fans and build lasting friendships on every adventure.",
  },
  {
    id: "why-2",
    header: "Stress-Free Journeys",
    description:
      "Relax and enjoy your journey while we take care of every small detail of the trip.",
  },
];

export const reviews = [
  {
    id: "rev-0",
    image: ReviewImg,
    profile_pic: ProfilePicUser,
    name: "Tejas Hinduja",
    review:
      "The yoga retreat in Europe was simply life-changing. I have started seeing a positive change in my life post this trip. The serene location and expert guidance on yoga and meditation was just perfect. Highly recommended!",
  },
  {
    id: "rev-1",
    image: ReviewImg,
    profile_pic: ProfilePicUser,
    name: "Tejas Hinduja",
    review:
      "Superb concept! The fitness trip in Thailand was incredible. The workouts were challenging but the beautiful Phuket beach made it worth it. A fantastic way to stay fit.",
  },
  {
    id: "rev-3",
    image: ReviewImg,
    profile_pic: ProfilePicUser,
    name: "Tejas Hinduja",
    review:
      "Booking the amusement park adventure in Thailand with my favourite influencer was such a great decision. Everything was well-planned as soon as I landed. Our trip leader was there with us throughout our trip to help us and guide us. Not to forget, I made so many new friends!",
  },
  {
    id: "rev-4",
    image: ReviewImg,
    profile_pic: ProfilePicUser,
    name: "Tejas Hinduja",
    review:
      "I have done 2 trips with Supersquad till now and both of them exceeded my expectations. I love solo travelling but could never find the right experiences that fit my taste. With Supersquad I not only get to hang out with famous influencers but also get opportunities to explore the minds of people who are similar to me.",
  },
  {
    id: "rev-5",
    image: ReviewImg,
    profile_pic: ProfilePicUser,
    name: "Tejas Hinduja",
    review:
      "As a photography enthusiast, I always struggled to find the finest locations and the right community along with whom I can practise my hobby. I recently booked the astro-photography tour in Kashmir and man I was blown away. Would love to do more photography tours with Supersquad.",
  },
  {
    id: "rev-6",
    image: ReviewImg,
    profile_pic: ProfilePicUser,
    name: "Tejas Hinduja",
    review:
      "I came back from Supersquad’s yoga retreat in Bali feeling absoluetly refreshed and rejuvenated. The whole experience was perfectly organized and truly relaxing. Waiting for their next yoga retreat and meet fellow yogis",
  },
];

export const updateMetaTags = ({ title, description, image, url }) => {
  // Update document title
  document.title = title || "Default Title";

  // Update or create meta tags
  const setMetaTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  // Set Open Graph meta tags
  setMetaTag("og:title", title || "Default Title");
  setMetaTag("og:description", description || "Default description");
  setMetaTag(
    "og:image",
    image || "https://your-site-link.com/default-image.jpg"
  );
  setMetaTag("og:url", url || window.location.href);
};
