import { jsx as _jsx } from "react/jsx-runtime";
import React, { lazy } from 'react';
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
const RouteWrapper = ({ children }) => {
    return (_jsx(ErrorBoundary, { children: _jsx(Layout, { children: children }) }));
};
// Route configuration
export const routes = [
    {
        path: '/',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Home, {}) }) })),
    },
    {
        path: '/calculator',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Calculator, {}) }) })),
    },
    {
        path: '/reviews',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Reviews, {}) }) })),
    },
    {
        path: '/blog',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Blog, {}) }) })),
    },
    {
        path: '/blog/:slug',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(BlogPost, {}) }) })),
    },
    {
        path: '/contacts',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Contacts, {}) }) })),
    },
    {
        path: '/about',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(About, {}) }) })),
    },
    {
        path: '/faq',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(FAQ, {}) }) })),
    },
    {
        path: '/services',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Services, {}) }) })),
    },
    {
        path: '/services/buyback-cars',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(BuybackCars, {}) }) })),
    },
    {
        path: '/services/urgent-buyback',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(UrgentBuyback, {}) }) })),
    },
    {
        path: '/services/damaged-cars',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(DamagedCars, {}) }) })),
    },
    {
        path: '/services/after-accident',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(AfterAccident, {}) }) })),
    },
    {
        path: '/services/credit-cars',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(CreditCars, {}) }) })),
    },
    {
        path: '/services/premium-cars',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(PremiumCars, {}) }) })),
    },
    {
        path: '/services/:slug',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Services, {}) }) })),
    },
    {
        path: '/prices',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Prices, {}) }) })),
    },
    {
        path: '/guarantees',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Guarantees, {}) }) })),
    },
    {
        path: '/how-we-work',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(HowWeWork, {}) }) })),
    },
    {
        path: '/why-us',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(WhyUs, {}) }) })),
    },
    {
        path: '/documents',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(Documents, {}) }) })),
    },
    {
        path: '/car-brands',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(CarBrands, {}) }) })),
    },
    {
        path: '*',
        element: (_jsx(RouteWrapper, { children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, { size: "lg" }), children: _jsx(NotFound, {}) }) })),
    },
];
