import React from 'react';
import styles from '../styles/About.module.scss';

const About = () => {
  const services = [
    {
      id: '01',
      title: 'COLOR GRADING & FINISHING',
      description: 'Professional color grading services to enhance your visual content.'
    },
    {
      id: '02',
      title: 'REMOTE COLOR GRADING',
      description: 'Remote color grading solutions for clients worldwide.'
    },
    {
      id: '03',
      title: 'ONLINE EDITING (VFX)',
      description: 'High-quality visual effects and editing services.'
    },
    {
      id: '04',
      title: 'DRY HIRE',
      description: 'Equipment rental services for your production needs.'
    }
  ];

  return (
    <div className={styles.about}>
      <section className="hero-section bg-black text-white py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">WE EAGER TO PARTNER WITH<br />GREAT STORYTELLER</h1>
        </div>
      </section>

      <section className="company-intro py-20">
        <div className="container mx-auto px-6">
          <p className="text-gray-700 max-w-4xl mx-auto text-center mb-20">
            Founded in 2019, Parallel Studio is ready to assist your whole post-production journey from coloring to delivering the film. We help creative minds push beyond limits, break barriers, and create great impact for brands. Our founders is passion driven industry expert. Awarded by campaign through the art of color grading and visual effects. 17,818 content has gone through our hands.
          </p>
        </div>
      </section>

      <section className="services py-20" id="our-services">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">OUR SERVICES</h2>
          <div className="space-y-8">
            {services.map((service) => (
              <div key={service.id} className="service-item border-t border-gray-200 pt-6">
                <div className="flex items-start">
                  <span className="text-xl font-semibold mr-8">{service.id}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">GOT A STORY TO TELL? SHARE YOUR<br />PORTFOLIO AND LET'S HONE IT TO<br />PERFECTION.</h2>
          <button className="border border-white px-8 py-3 mt-6 hover:bg-white hover:text-black transition-all">
            SEND US YOUR PORTFOLIO
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;