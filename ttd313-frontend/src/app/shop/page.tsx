import CategoryRow from '@/components/categoryRow';
import HomeHero from '@/components/homeHero';
import React from 'react';

const Shop = () => {
  return (
    <div>
      <HomeHero
        title="Shop"
        link={{ label: 'Check Out the Menu', href: '/menu' }}
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      />
      <CategoryRow />
    </div>
  );
};

export default Shop;
