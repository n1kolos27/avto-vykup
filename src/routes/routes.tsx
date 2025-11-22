import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary.js';
import Layout from '../components/Layout.js';
import LoadingSpinner from '../components/ui/LoadingSpinner.js';

// Lazy load routes for code splitting
const Home = lazy(() => import('./Home'));
const Calculator = lazy(() => import('./Calculator'));
const Reviews = lazy(() => import('./Reviews'));
const Blog = lazy(() => import('./Blog'));
const BlogPost = lazy(() => import('./BlogPost'));
const Contacts = lazy(() => import('./Contacts'));
const About = lazy(() => import('./About'));
const FAQ = lazy(() => import('./FAQ'));
const Services = lazy(() => import('./Services'));
const UrgentBuyback = lazy(() => import('./services/UrgentBuyback'));
const BuybackCars = lazy(() => import('./services/BuybackCars'));
const DamagedCars = lazy(() => import('./services/DamagedCars'));
const AfterAccident = lazy(() => import('./services/AfterAccident'));
const CreditCars = lazy(() => import('./services/CreditCars'));
const PremiumCars = lazy(() => import('./services/PremiumCars'));
const Prices = lazy(() => import('./Prices'));
const Guarantees = lazy(() => import('./Guarantees'));
const HowWeWork = lazy(() => import('./HowWeWork'));
const WhyUs = lazy(() => import('./WhyUs'));
const Documents = lazy(() => import('./Documents'));
const CarBrands = lazy(() => import('./CarBrands'));
const NotFound = lazy(() => import('./NotFound'));

// Wrapper component for routes with Layout and ErrorBoundary
const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Layout>{children}</Layout>
    </ErrorBoundary>
  );
};

// Route configuration
export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Home />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/calculator',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Calculator />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/reviews',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Reviews />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/blog',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Blog />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/blog/:slug',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <BlogPost />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/contacts',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Contacts />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/about',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <About />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/faq',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <FAQ />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Services />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/buyback-cars',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <BuybackCars />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/urgent-buyback',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <UrgentBuyback />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/damaged-cars',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <DamagedCars />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/after-accident',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <AfterAccident />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/credit-cars',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <CreditCars />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/premium-cars',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <PremiumCars />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/services/:slug',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Services />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/prices',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Prices />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/guarantees',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Guarantees />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/how-we-work',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <HowWeWork />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/why-us',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <WhyUs />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/documents',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <Documents />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '/car-brands',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <CarBrands />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
  {
    path: '*',
    element: (
      <RouteWrapper>
        <React.Suspense fallback={<LoadingSpinner size="lg" />}>
          <NotFound />
        </React.Suspense>
      </RouteWrapper>
    ),
  },
];

