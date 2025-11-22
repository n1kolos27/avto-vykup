import React, { useEffect } from 'react';

interface SchemaMarkupProps {
  schema: Record<string, unknown>;
  id?: string;
}

/**
 * Компонент для добавления Schema.org разметки (JSON-LD) в head документа
 * Используется для SEO оптимизации
 */
const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema, id }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const scriptId = id || `schema-${Date.now()}-${Math.random()}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(schema);
    script.setAttribute('data-schema', 'true');

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [schema, id]);

  return null;
};

export default SchemaMarkup;

