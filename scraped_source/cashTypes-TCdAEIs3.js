import{H as o,C as n,l as d,$ as L,c as r}from"./index-BSSaxj3E.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=o("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]),E=r,h=d,l=n;async function H(a){const s=await L.get(`/cash/orders/${a.id}/pdf`,{responseType:"blob"}),c=a.type==="in"?"Приходный кассовый ордер":"Расходный кассовый ордер",t=URL.createObjectURL(s.data),e=document.createElement("a");e.href=t,e.download=`${c} ${a.number}.pdf`,document.body.appendChild(e),e.click(),e.remove(),URL.revokeObjectURL(t)}export{l as C,A as F,h as a,E as b,H as d};
