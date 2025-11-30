import React from 'react';
import LandingHero from '../components/LandingHero';
import PopularServices from '../components/PopularServices';
import HowItWorks from '../components/HowItWorks';
import FeaturedProfessionals from '../components/FeaturedProfessionals';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';
import CTASection from '../components/CTASection';
import SiteFooter from '../components/SiteFooter';

export default function Home(){
  return (
    <div>
      <LandingHero />
      <PopularServices />
      <HowItWorks />
      <FeaturedProfessionals />
      <Testimonials />
      <WhyChooseUs />
      <CTASection />
      <SiteFooter />
    </div>
  );
}
