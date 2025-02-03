import React from "react";
import { Hero } from "../../shared/components/Hero";
import { ValueCard } from "../../shared/components/ValueCard";
import { MilestoneCard } from "../../shared/components/MilestoneCard";
import { TeamMemberCard } from "../../shared/components/TeamMemberCard";
import { ModernMenu } from "../../shared/components/ModernMenu";
import Footer from "../../shared/components/Footer";
import { CallToAction } from "../../shared/components/CallToAction";
import { footerLinks } from "../../shared/utils/FooterLinks";

import {
  CORE_VALUES,
  COMPANY_MILESTONES,
  TEAM_MEMBERS,
} from "../../shared/data/data";

const About: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Modern Menu */}
      <ModernMenu />

      {/* Use existing Hero component with top margin to prevent menu overlap */}
      <Hero
        title="Tu Tienda de Confianza"
        description="Entregando Calidad, Comodidad y Innovación a tu Puerta"
        subtitle="Empoderando tu Experiencia de Compra"
        primaryButtonText="Comprar Ahora"
        primaryButtonLink="/productos"
        overlayOpacity={0.6}
      />

      {/* Our Story Section */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">
          Nuestra Historia
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {COMPANY_MILESTONES.map((milestone, index) => (
            <MilestoneCard key={index} {...milestone} />
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">
            Nuestros Valores Fundamentales
          </h2>
          <div className="grid md:grid-cols-4 gap-6 px-4">
            {CORE_VALUES.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-12">
          Conoce a Nuestro Equipo
        </h2>
        <div className="grid md:grid-cols-2 gap-8 px-4">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </section>

      {/* Minimal Variant */}
      <CallToAction
        variant="minimal"
        title="¿Necesitas Ayuda?"
        description="Nuestro equipo de soporte está listo para ayudarte"
        buttonText="Contáctanos"
      />

      {/* Footer */}
      <Footer
        companyName="Mi Compañía"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default About;
