import barber from "../assets/occupations/baber.png";
import driver from "../assets/occupations/hairdresser.png";
import makeup from "../assets/occupations/makeup.png";
import plumber from "../assets/occupations/plumber.png";

export const providersData = [
  {
    id: 1,
    name: "John Doe",
    service: "Barber",
    starRating: 2.8,
    image: barber,
    email: "johndoe@gmail.com",
    phone: "+2347012345678",
    location: "Lagos",
    verifiedId: true,
    description:
      "Professional barber with 5 years of experience specializing in modern and traditional haircuts.",
    reviews: [
      {
        name: "James Wilson",
        text: "Great service and very professional",
        rating: 4,
      },
      {
        name: "Sarah Parker",
        text: "Excellent attention to detail",
        rating: 5,
      },
      { name: "Mike Thompson", text: "Very skilled and friendly", rating: 4 },
    ],
    gallery: [
      "/directl1.png",
      "/directly2.png",
      "/directly3.png",
      "/directly4.png",
    ],
  },
  {
    id: 2,
    name: "Emily Smith",
    service: "Driver",
    starRating: 4.6,
    image: driver,
    email: "emilysmith@gmail.com",
    phone: "+2347023456789",
    location: "Abuja",
    verifiedId: true,
    description:
      "Professional driver with over 7 years of experience. Licensed and insured for both personal and commercial driving.",
    reviews: [
      {
        name: "David Brown",
        text: "Very punctual and professional",
        rating: 5,
      },
      { name: "Linda James", text: "Safe and reliable driver", rating: 4 },
      {
        name: "Robert Wilson",
        text: "Great service and very friendly",
        rating: 5,
      },
    ],
    gallery: [
      "/directly1.png",
      "/directly2.png",
      "/directly3.png",
      "/directly4.png",
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    service: "Personal Trainer",
    starRating: 4.9,
    image: makeup,
    email: "michaelbrown@gmail.com",
    phone: "+2347034567890",
    location: "Port Harcourt",
    verifiedId: true,
    description:
      "Certified personal trainer helping clients achieve their fitness goals through customized workout plans.",
    reviews: [
      {
        name: "Chris Evans",
        text: "Very knowledgeable and supportive",
        rating: 5,
      },
      { name: "Anna Lee", text: "Helped me transform my body", rating: 4.9 },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
  {
    id: 4,
    name: "Sophia Johnson",
    service: "Driver",
    starRating: 4.7,
    image: plumber,
    email: "sophiajohnson@gmail.com",
    phone: "+2347045678901",
    location: "Kano",
    verifiedId: true,
    description:
      "Experienced childcare provider offering safe and nurturing services for kids of all ages.",
    reviews: [
      {
        name: "Jessica Alba",
        text: "Great with kids and very caring",
        rating: 4.8,
      },
      { name: "Mark Jones", text: "Trustworthy and professional", rating: 4.7 },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
  {
    id: 5,
    name: "Daniel Lee",
    service: "Gardener",
    starRating: 4.5,
    image: makeup,
    email: "daniellee@gmail.com",
    phone: "+2347056789012",
    location: "Ibadan",
    verifiedId: true,
    description:
      "Expert gardener with a passion for landscape design and plant care.",
    reviews: [
      {
        name: "John Stewart",
        text: "My garden has never looked better",
        rating: 4.5,
      },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
  {
    id: 6,
    name: "Olivia Martinez",
    service: "House Cleaner",
    starRating: 4.8,
    image: plumber,
    email: "oliviamartinez@gmail.com",
    phone: "+2347067890123",
    location: "Enugu",
    verifiedId: true,
    description:
      "Reliable house cleaner offering top-quality residential and office cleaning services.",
    reviews: [
      { name: "Sophia Kim", text: "Very thorough and efficient", rating: 4.8 },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
  {
    id: 7,
    name: "Liam Wilson",
    service: "DJ",
    starRating: 4.9,
    image: barber,
    email: "liamwilson@gmail.com",
    phone: "+2347078901234",
    location: "Benin",
    verifiedId: true,
    description:
      "Professional DJ providing top-tier entertainment for events and parties.",
    reviews: [
      {
        name: "Megan Fox",
        text: "Kept the party alive all night",
        rating: 4.9,
      },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
  {
    id: 8,
    name: "Emma Davis",
    service: "Makeup Artist",
    starRating: 4.6,
    image: makeup,
    email: "emmadavis@gmail.com",
    phone: "+2347089012345",
    location: "Jos",
    verifiedId: true,
    description:
      "Certified makeup artist with expertise in bridal, fashion, and special effects makeup.",
    reviews: [
      {
        name: "Lily Collins",
        text: "Amazing artistry and attention to detail",
        rating: 4.6,
      },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
  {
    id: 9,
    name: "Noah Taylor",
    service: "IT Specialist",
    starRating: 4.7,
    image: driver,
    email: "noahtaylor@gmail.com",
    phone: "+2347090123456",
    location: "Owerri",
    verifiedId: true,
    description:
      "Experienced IT specialist providing tech support, software development, and networking solutions.",
    reviews: [
      {
        name: "Elon Gates",
        text: "Very knowledgeable and helpful",
        rating: 4.7,
      },
    ],
    gallery: ["/directly1.png", "/directly2.png", "/directly3.png"],
  },
];
