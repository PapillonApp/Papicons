import type { Template } from '@svgr/babel-plugin-transform-svg-component';
import * as t from '@babel/types';

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

function setOrUpdateAttribute(
  node: t.JSXElement,
  name: string,
  value: t.JSXExpressionContainer | t.StringLiteral
) {
  const existingAttr = node.openingElement.attributes.find(
    (attr) =>
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      attr.name.name === name
  ) as t.JSXAttribute | undefined;

  if (existingAttr) {
    existingAttr.value = value;
  } else {
    node.openingElement.attributes.push(
      t.jsxAttribute(t.jsxIdentifier(name), value)
    );
  }
}

const PapiconsTemplate: Template = (variables, { tpl }) => {
  const svgNode = variables.jsx;

  setOrUpdateAttribute(svgNode, 'viewBox', t.stringLiteral('0 0 24 24'));
  setOrUpdateAttribute(svgNode, 'width', t.jsxExpressionContainer(t.identifier('props.size ?? props.width ?? 24')));
  setOrUpdateAttribute(svgNode, 'height', t.jsxExpressionContainer(t.identifier('props.size ?? props.height ?? 24')));
  setOrUpdateAttribute(svgNode, 'fill', t.jsxExpressionContainer(t.identifier('props.color ?? props.fill ?? "currentColor"')));

  const template = tpl`
${variables.imports};
import type { PapiconsProps } from '../types/PapiconsProps';
${variables.interfaces};

${generateJSdocs(variables.componentName)}

const ${variables.componentName} = (props: PapiconsProps & SvgProps): React.JSX.Element => (
  ${svgNode}
);

${variables.exports};
`;
  return template;
};

module.exports = PapiconsTemplate;
