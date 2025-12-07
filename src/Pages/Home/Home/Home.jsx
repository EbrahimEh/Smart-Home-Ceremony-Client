import React from 'react';
import Banner from '../Banner/Banner';
import ServicesSection from '../ServicesSection/ServicesSection';
import TopDecorators from '../TopDecorators/TopDecorators';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ServicesSection></ServicesSection>
            <TopDecorators></TopDecorators>
        </div>
    );
};

export default Home;