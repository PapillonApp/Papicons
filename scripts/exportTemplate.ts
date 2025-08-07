// ✅ Bon export : SVGR attend une fonction exportée par défaut (CommonJS style)
import type { Template,  } from '@svgr/babel-plugin-transform-svg-component';

const generateJSdocs = (name: string) => {
  return `
/**
 * @component
 * @name ${name.replace('Svg', '')}
 * @description Papicons SVG icon component, renders SVG Element with children.
 *
 * @param {Object} props - Papicons icons props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 */
`
}

const PapiconsTemplate: Template = (variables, { tpl }) => {
  return tpl`
${variables.imports};
${variables.interfaces};

${generateJSdocs(variables.componentName)}

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);

${variables.exports};
`;
};

module.exports = PapiconsTemplate;
