import { ValueCardProps } from "../components/ValueCard";
import { MilestoneCardProps } from "../components/MilestoneCard";
import { TeamMemberCardProps } from "../components/TeamMemberCard";
import { FaLinkedin, FaTwitter, FaShoppingCart, FaTruck, FaHeadset, FaRecycle, FaGlobe } from 'react-icons/fa';

export const CORE_VALUES: ValueCardProps[] = [
    {
      icon: FaShoppingCart,
      title: 'Cliente Primero',
      description: 'Proporcionar una experiencia de compra excepcional con servicio personalizado y productos seleccionados.'
    },
    {
      icon: FaTruck,
      title: 'Entrega Sin Problemas',
      description: 'Envíos rápidos, confiables y rastreables para asegurarte de que tus productos lleguen a salvo y a tiempo.'
    },
    {
      icon: FaHeadset,
      title: 'Experiencia de Soporte',
      description: 'Equipo de soporte al cliente dedicado listo para ayudarte en cada paso de tu aventura de compras.'
    },
    {
      icon: FaRecycle,
      title: 'Prácticas Sustentables',
      description: 'Comprometidos con envases ecológicos y líneas de productos sostenibles.'
    }
  ];
export const COMPANY_MILESTONES: MilestoneCardProps[] = [
    {
      year: 2015,
      title: 'Nuestros Humildes Comienzos',
      description: 'Comenzamos como una pequeña tienda en línea con una pasión por productos de calidad y satisfacción del cliente.'
    },
    {
      year: 2018,
      title: 'Expansión Global',
      description: 'Lanzamos envíos internacionales y ampliamos nuestra gama de productos para servir a una audiencia global.'
    },
    {
      year: 2021,
      title: 'Innovación Digital',
      description: 'Implementamos recomendaciones impulsadas por inteligencia artificial y experiencias de compras personalizadas.'
    },
    {
      year: 2023,
      title: 'Compromiso con la Sostenibilidad',
      description: 'Iniciamos nuestra iniciativa verde con envases ecológicos y envíos con neutrales en carbono.'
    }
  ];
  
export const TEAM_MEMBERS: TeamMemberCardProps[] = [
    {
      name: 'Jose Manuel Tenchipe del Valle',
      role: 'Fundador y CEO',
      image: '/assets/images/team/Fundador.jpg',
      socialLinks: [
        { icon: FaLinkedin, url: 'https://linkedin.com/in/elenarodriguez' },
        { icon: FaTwitter, url: 'https://twitter.com/elenarodriguez' }
      ]
    },
    {
      name: 'Miguel Santos',
      role: 'Director de Tecnología',
      image: '/assets/images/team/miguel.jpg',
      socialLinks: [
        { icon: FaLinkedin, url: 'https://linkedin.com/in/miguelsantos' },
        { icon: FaGlobe, url: 'https://portfolio.miguelsantos.com' }
      ]
    }
  ];