/**
 * Component System
 * 
 * Единая система компонентов для всего приложения.
 * 
 * @module lib/component-system
 */

// Документация компонентов находится в соответствующих .md файлах в этой директории

/**
 * Список всех компонентов проекта
 */
export const COMPONENTS = {
  // UI Components
  ui: {
    Button: 'components/ui/Button',
    Card: 'components/ui/Card',
    Input: 'components/ui/Input',
    LoadingSpinner: 'components/ui/LoadingSpinner',
    Toast: 'components/ui/Toast',
  },
  // Layout Components
  layout: {
    Header: 'components/Header',
    Footer: 'components/Footer',
  },
  // Form Components
  forms: {
    CarEvaluationForm: 'components/CarEvaluationForm',
    Calculator: 'components/Calculator',
  },
  // Section Components
  sections: {
    HeroSection: 'components/sections/HeroSection',
    AdvantagesSection: 'components/sections/AdvantagesSection',
    ProcessSection: 'components/sections/ProcessSection',
    StatsSection: 'components/sections/StatsSection',
    ComparisonSection: 'components/sections/ComparisonSection',
    FAQSection: 'components/sections/FAQSection',
    ReviewsPreview: 'components/sections/ReviewsPreview',
    CasesSection: 'components/sections/CasesSection',
    GuaranteesSection: 'components/sections/GuaranteesSection',
    TrustSection: 'components/sections/TrustSection',
    UrgencySection: 'components/sections/UrgencySection',
    SectionCTA: 'components/sections/SectionCTA',
  },
  // Feature Components
  features: {
    ChatWidget: 'components/ChatWidget',
    PhoneButton: 'components/PhoneButton',
    BlogCard: 'components/BlogCard',
    ReviewCard: 'components/ReviewCard',
    Breadcrumbs: 'components/Breadcrumbs',
    AnimatedCard: 'components/AnimatedCard',
    AnimatedSection: 'components/AnimatedSection',
    FloatingCTA: 'components/FloatingCTA',
    PreparationTips: 'components/PreparationTips',
    PriceFactors: 'components/PriceFactors',
    Analytics: 'components/Analytics',
    ScrollAnalytics: 'components/ScrollAnalytics',
  },
} as const;

/**
 * Правила использования компонентов
 */
export const COMPONENT_RULES = {
  // Всегда используйте типизированные компоненты
  USE_TYPED_COMPONENTS: true,
  // Следуйте Design System
  FOLLOW_DESIGN_SYSTEM: true,
  // Accessibility first
  ACCESSIBILITY_FIRST: true,
  // Responsive design
  RESPONSIVE_DESIGN: true,
  // Performance optimization
  PERFORMANCE_OPTIMIZATION: true,
} as const;

