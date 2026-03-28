"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("@babel/types");
function setOrUpdateAttribute(node, name, value) {
    var existingAttr = node.openingElement.attributes.find(function (attr) {
        return t.isJSXAttribute(attr) &&
            t.isJSXIdentifier(attr.name) &&
            attr.name.name === name;
    });
    if (existingAttr) {
        existingAttr.value = value;
    }
    else {
        node.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier(name), value));
    }
}
var PapiconsTemplate = function (variables, _a) {
    var tpl = _a.tpl;
    var svgNode = variables.jsx;
    setOrUpdateAttribute(svgNode, 'viewBox', t.stringLiteral('0 0 24 24'));
    setOrUpdateAttribute(svgNode, 'width', t.jsxExpressionContainer(t.identifier('props.size ?? props.width ?? 24')));
    setOrUpdateAttribute(svgNode, 'height', t.jsxExpressionContainer(t.identifier('props.size ?? props.height ?? 24')));
    setOrUpdateAttribute(svgNode, 'fill', t.jsxExpressionContainer(t.identifier('props.color ?? props.fill ?? "currentColor"')));
    setOrUpdateAttribute(svgNode, 'style', t.jsxExpressionContainer(t.identifier('[{ opacity: props.opacity ?? 1 }, props.style]')));
    var template = tpl(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n", ";\nimport type { PapiconsProps } from '../types/PapiconsProps';\n", ";\n\nconst ", " = (props: PapiconsProps & SvgProps): React.JSX.Element => (\n  ", "\n);\n\n", ";\n"], ["\n", ";\nimport type { PapiconsProps } from '../types/PapiconsProps';\n", ";\n\nconst ", " = (props: PapiconsProps & SvgProps): React.JSX.Element => (\n  ", "\n);\n\n", ";\n"])), variables.imports, variables.interfaces, variables.componentName, svgNode, variables.exports);
    return template;
};
module.exports = PapiconsTemplate;
var templateObject_1;
