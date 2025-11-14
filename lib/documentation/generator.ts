/**
 * Documentation System - Generator
 * 
 * Генерация документации из JSDoc комментариев
 */

/**
 * Извлечение JSDoc комментариев из кода
 */
export function extractJSDoc(fileContent: string): {
  description?: string;
  params?: Record<string, string>;
  returns?: string;
  examples?: string[];
} {
  const jsdocRegex = /\/\*\*\s*\n([\s\S]*?)\s*\*\//;
  const match = fileContent.match(jsdocRegex);
  
  if (!match) {
    return {};
  }

  const jsdoc = match[1];
  const lines = jsdoc.split('\n').map(line => line.replace(/^\s*\*\s?/, '').trim());

  const result: {
    description?: string;
    params?: Record<string, string>;
    returns?: string;
    examples?: string[];
  } = {};

  let currentSection: 'description' | 'params' | 'returns' | 'examples' = 'description';
  const descriptionLines: string[] = [];
  const paramLines: string[] = [];
  const returnLines: string[] = [];
  const exampleLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('@param')) {
      currentSection = 'params';
      paramLines.push(line);
    } else if (line.startsWith('@returns') || line.startsWith('@return')) {
      currentSection = 'returns';
      returnLines.push(line);
    } else if (line.startsWith('@example')) {
      currentSection = 'examples';
      exampleLines.push(line);
    } else if (line && currentSection === 'description') {
      descriptionLines.push(line);
    } else if (line && currentSection === 'params') {
      paramLines[paramLines.length - 1] += ' ' + line;
    } else if (line && currentSection === 'returns') {
      returnLines[returnLines.length - 1] += ' ' + line;
    } else if (line && currentSection === 'examples') {
      exampleLines[exampleLines.length - 1] += '\n' + line;
    }
  }

  if (descriptionLines.length > 0) {
    result.description = descriptionLines.join(' ');
  }

  if (paramLines.length > 0) {
    result.params = {};
    for (const paramLine of paramLines) {
      const paramMatch = paramLine.match(/@param\s+(\w+)\s+(.+)/);
      if (paramMatch) {
        result.params[paramMatch[1]] = paramMatch[2];
      }
    }
  }

  if (returnLines.length > 0) {
    result.returns = returnLines.join(' ').replace(/@returns?\s*/, '');
  }

  if (exampleLines.length > 0) {
    result.examples = exampleLines.map(line => line.replace(/@example\s*/, ''));
  }

  return result;
}

/**
 * Генерация Markdown документации
 */
export function generateMarkdownDoc(
  name: string,
  jsdoc: ReturnType<typeof extractJSDoc>
): string {
  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push('');

  if (jsdoc.description) {
    lines.push(jsdoc.description);
    lines.push('');
  }

  if (jsdoc.params) {
    lines.push('## Parameters');
    lines.push('');
    for (const [param, description] of Object.entries(jsdoc.params)) {
      lines.push(`- \`${param}\`: ${description}`);
    }
    lines.push('');
  }

  if (jsdoc.returns) {
    lines.push('## Returns');
    lines.push('');
    lines.push(jsdoc.returns);
    lines.push('');
  }

  if (jsdoc.examples && jsdoc.examples.length > 0) {
    lines.push('## Examples');
    lines.push('');
    for (const example of jsdoc.examples) {
      lines.push('```typescript');
      lines.push(example);
      lines.push('```');
      lines.push('');
    }
  }

  return lines.join('\n');
}

