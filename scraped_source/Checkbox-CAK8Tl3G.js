import{j as c}from"./query-CwiaLd8H.js";import{H as h}from"./index-BSSaxj3E.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=h("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);function p({checked:e,onChange:a,readOnly:o=!1,disabled:t=!1,id:x,label:s,className:n,"data-testid":d}){const i=!o&&!t&&a!=null,l=()=>{i&&a(!e)},u=c.jsx("span",{id:x,role:"checkbox","aria-checked":e,"aria-readonly":o||void 0,"aria-disabled":t||void 0,"data-testid":d,tabIndex:i?0:void 0,className:`ui-checkbox${e?" ui-checkbox-checked":""}${t?" ui-checkbox-disabled":""}${o?" ui-checkbox-readonly":""}${n?` ${n}`:""}`,onClick:l,onKeyDown:r=>{i&&(r.key===" "||r.key==="Enter")&&(r.preventDefault(),l())},children:e&&c.jsx(k,{size:14,strokeWidth:3,"aria-hidden":!0})});return s==null?u:c.jsxs("label",{className:`ui-checkbox-label${t?" ui-checkbox-label-disabled":""}`,style:{cursor:i?"pointer":"default"},children:[u,c.jsx("span",{className:"ui-checkbox-text",children:s})]})}export{p as C};
