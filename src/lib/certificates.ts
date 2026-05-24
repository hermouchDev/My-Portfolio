export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Laravel 11 - From Basics to Advance",
    issuer: "Udemy",
    date: "May 23, 2026",
    image: "/certificates/Laravel.jpg",
    url: "https://ude.my/UC-96755ba5-6221-4b5e-b91f-9a18acf4c656",
  },
  {
    id: 2,
    title: "Modern PHP: The Complete Guide - from Beginner to Advanced",
    issuer: "Udemy",
    date: "Dec 7, 2025",
    image: "/certificates/PHP.jpg",
    url: "https://ude.my/UC-0488dbb8-2997-4c36-82fc-6186829b1fb8",
  },
  {
    id: 3,
    title: "The Ultimate React Course 2025: React, Next.js, Redux & More",
    issuer: "Udemy",
    date: "March 6, 2026",
    image: "/certificates/React.jpg",
    url: "https://ude.my/UC-711c3d07-6748-4c65-a325-ff41c715fe99",
  },
];
