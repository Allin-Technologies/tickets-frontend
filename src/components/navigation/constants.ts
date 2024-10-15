interface Link {
  title: string;
  url?: string;
  display: "link" | "button";
}

export const navLinks: Link[] = [
  {
    title: "Discover Events",
    url: "/discover",
    display: "link",
  },
  {
    title: "How Tickets work",
    url: "/faq#how-tickets-work",
    display: "link",
  },
  {
    title: "Pricing",
    url: "/pricing",
    display: "link",
  },
  {
    title: "About",
    url: "/about",
    display: "link",
  },
  {
    title: "Book a demo",
    url: "/book-a-demo",
    display: "button",
  },
];

export const mobile_links: Link[] = [
  {
    title: "Home",
    url: "/",
    display: "link",
  },
  ...navLinks,
];

export const footer: {
  links: Link[];
  socials: { url: string; icon: string }[];
  contacts: { title: string; url: string; icon: string }[];
} = {
  links: [
    {
      title: "Home",
      url: "/",
      display: "link",
    },
    ...navLinks,
  ],
  socials: [
    { url: "#", icon: "/icons/Facebook.svg" },
    { url: "#", icon: "/icons/Twitter.svg" },
    { url: "#", icon: "/icons/Instagram.svg" },
    { url: "#", icon: "/icons/LinkedIn.svg" },
  ],
  contacts: [
    {
      title: "+234 333 6527",
      url: "tel:+234 333 6527",
      icon: "/icons/Phone.svg",
    },
    {
      title: "Tickets@all-in.com",
      url: "mailto:tickets@all-in.com",
      icon: "/icons/Email.svg",
    },
    {
      title: "All-in Headquaters, GRA Port Harcourt, Nigeria",
      url: "#",
      icon: "/icons/Map Pin.svg",
    },
  ],
};
