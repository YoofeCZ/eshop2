import{r as g,i as f,k as C,j as e,u as $,H as b,e as v,g as P,B as j}from"./index-C6iN-f8T.js";import{C as y}from"./Container-CeyNV1qF.js";const S=g.forwardRef(({bsPrefix:r,className:o,striped:c,bordered:i,borderless:l,hover:d,size:t,variant:n,responsive:a,...u},p)=>{const s=f(r,"table"),m=C(o,s,n&&`${s}-${n}`,t&&`${s}-${t}`,c&&`${s}-${typeof c=="string"?`striped-${c}`:"striped"}`,i&&`${s}-bordered`,l&&`${s}-borderless`,d&&`${s}-hover`),x=e.jsx("table",{...u,className:m,ref:p});if(a){let h=`${s}-responsive`;return typeof a=="string"&&(h=`${h}-${a}`),e.jsx("div",{className:h,children:x})}return x}),k=()=>{const{t:r,i18n:o}=$(),c=JSON.parse(localStorage.getItem("cart")||"[]"),i=o.language==="en"?"USD":o.language==="eu"?"EUR":"CZK",l=o.language==="en"?"en-US":"cs-CZ",d=t=>{const n=c.filter(a=>a.id!==t);localStorage.setItem("cart",JSON.stringify(n)),window.location.reload()};return e.jsxs(e.Fragment,{children:[e.jsxs(b,{children:[e.jsx("title",{children:r("cartTitle")}),e.jsx("meta",{name:"description",content:r("cartDescription")})]}),e.jsxs(y,{children:[e.jsx("h2",{children:r("cartTitle")}),c.length===0?e.jsx("p",{children:r("cartEmpty")}):e.jsxs(S,{striped:!0,bordered:!0,hover:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:r("product")}),e.jsx("th",{children:r("productPrice")}),e.jsx("th",{children:r("action")})]})}),e.jsx("tbody",{children:c.map(t=>{const n=i==="CZK"?t.price:v(t.price,i),a=P(n,i,l);return e.jsxs("tr",{children:[e.jsx("td",{children:t.name}),e.jsx("td",{children:a}),e.jsx("td",{children:e.jsx(j,{variant:"danger",onClick:()=>d(t.id),children:r("removeFromCart")})})]},t.id)})})]}),e.jsx(j,{variant:"success",href:"/checkout",children:r("proceedToCheckout")})]})]})};export{k as default};
