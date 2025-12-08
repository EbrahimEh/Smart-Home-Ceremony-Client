import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../ServicesSection/ServicesSection';
import TopDecorators from '../TopDecorators/TopDecorators';
import ServiceMap from '../ServiceMap/ServiceMap';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <TopDecorators></TopDecorators>
            <ServiceMap></ServiceMap>
        </div>
    );
};

export default Home;