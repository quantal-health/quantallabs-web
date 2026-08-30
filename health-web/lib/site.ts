export const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/for-clinics", label: "For Clinics" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/product", label: "Overview" },
      { href: "/for-clinics", label: "For Clinics" },
      { href: "/pricing", label: "Pricing" },
      { href: "/demo", label: "Try the demo" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { href: "/security", label: "Security & HIPAA" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Talk to founders" },
    ],
  },
] as const;
