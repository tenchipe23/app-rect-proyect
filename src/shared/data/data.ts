import { ValueCardProps } from "../components/ValueCard";
import { MilestoneCardProps } from "../components/MilestoneCard";
import { TeamMemberCardProps } from "../components/TeamMemberCard";
import { FaLinkedin, FaTwitter, FaShoppingCart, FaTruck, FaHeadset, FaRecycle, FaGlobe } from 'react-icons/fa';

export const CORE_VALUES: ValueCardProps[] = [
    {
      icon: FaShoppingCart,
      title: 'Customer First',
      description: 'Providing an exceptional shopping experience with personalized service and curated products.'
    },
    {
      icon: FaTruck,
      title: 'Seamless Delivery',
      description: 'Fast, reliable, and trackable shipping to ensure your products arrive safely and on time.'
    },
    {
      icon: FaHeadset,
      title: 'Support Excellence',
      description: 'Dedicated customer support team ready to assist you at every step of your shopping journey.'
    },
    {
      icon: FaRecycle,
      title: 'Sustainable Practices',
      description: 'Committed to eco-friendly packaging and supporting sustainable product lines.'
    }
  ];
export const COMPANY_MILESTONES: MilestoneCardProps[] = [
    {
      year: 2015,
      title: 'Our Humble Beginnings',
      description: 'Started as a small online store with a passion for quality products and customer satisfaction.'
    },
    {
      year: 2018,
      title: 'Expanding Horizons',
      description: 'Launched international shipping and expanded our product range to serve a global audience.'
    },
    {
      year: 2021,
      title: 'Digital Innovation',
      description: 'Implemented AI-powered recommendations and personalized shopping experiences.'
    },
    {
      year: 2023,
      title: 'Sustainability Commitment',
      description: 'Initiated our green initiative with eco-friendly packaging and carbon-neutral shipping.'
    }
  ];
  
export const TEAM_MEMBERS: TeamMemberCardProps[] = [
    {
      name: 'Elena Rodriguez',
      role: 'Founder & CEO',
      image: '/assets/images/team/elena.jpg',
      socialLinks: [
        { icon: FaLinkedin, url: 'https://linkedin.com/in/elenarodriguez' },
        { icon: FaTwitter, url: 'https://twitter.com/elenarodriguez' }
      ]
    },
    {
      name: 'Miguel Santos',
      role: 'Chief Technology Officer',
      image: '/assets/images/team/miguel.jpg',
      socialLinks: [
        { icon: FaLinkedin, url: 'https://linkedin.com/in/miguelsantos' },
        { icon: FaGlobe, url: 'https://portfolio.miguelsantos.com' }
      ]
    }
  ];