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
    title: "Pricing",
    url: "/pricing",
    display: "link",
  },
  {
    title: "About",
    url: "/about-us",
    display: "link",
  },
  {
    title: "Book a demo",
    url: "#contact",
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
    {
      title: "Join our team",
      url: "/joinourteam",
      display: "link",
    },
  ],
  socials: [
    {
      url: "https://www.tiktok.com/@tickets.byallin?_t=8qahBvqiWEY&_r=1",
      icon: "/icons/Tiktok.svg",
    },
    { url: "https://x.com/ticketsbyallin?s=21", icon: "/icons/Twitter.svg" },
    {
      url: "https://www.instagram.com/ticketsbyall.in?igsh=dDNzc3hhd3NhaGo5",
      icon: "/icons/Instagram.svg",
    },
  ],
  contacts: [
    {
      title: "+234 905 155 5542",
      url: "tel:+2349051555542",
      icon: "/icons/Phone.svg",
    },
    {
      title: "Tickets@lifewithallin.com",
      url: "mailto:tickets@lifewithallin.com",
      icon: "/icons/Email.svg",
    },
    {
      title: "All-in Headquaters, GRA Port Harcourt, Nigeria",
      url: "#",
      icon: "/icons/Map Pin.svg",
    },
  ],
};
