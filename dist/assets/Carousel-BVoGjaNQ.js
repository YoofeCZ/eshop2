import{r as n,h as Me,i as F,j as o,k as j,l as De,m as $e,n as Ae,o as Le,p as ae,t as Oe,q as oe,A as le,T as _e,s as Xe}from"./index-Lcmh4N_S.js";function He(s,r){const l=n.useRef(!0);n.useEffect(()=>{if(l.current){l.current=!1;return}return s()},r)}function Pe(){const s=n.useRef(!0),r=n.useRef(()=>s.current);return n.useEffect(()=>(s.current=!0,()=>{s.current=!1}),[]),r.current}const W=2**31-1;function ce(s,r,l){const u=l-Date.now();s.current=u<=W?setTimeout(r,u):setTimeout(()=>ce(s,r,l),W)}function Ue(){const s=Pe(),r=n.useRef();return Me(()=>clearTimeout(r.current)),n.useMemo(()=>{const l=()=>clearTimeout(r.current);function u(m,c=0){s()&&(l(),c<=W?r.current=setTimeout(m,c):ce(r,m,Date.now()+c))}return{set:u,clear:l,handleRef:r}},[])}const ue=n.forwardRef(({className:s,bsPrefix:r,as:l="div",...u},m)=>(r=F(r,"carousel-caption"),o.jsx(l,{ref:m,className:j(s,r),...u})));ue.displayName="CarouselCaption";const ie=n.forwardRef(({as:s="div",bsPrefix:r,className:l,...u},m)=>{const c=j(l,F(r,"carousel-item"));return o.jsx(s,{ref:m,...u,className:c})});ie.displayName="CarouselItem";const We=40;function Fe(s){if(!s||!s.style||!s.parentNode||!s.parentNode.style)return!1;const r=getComputedStyle(s);return r.display!=="none"&&r.visibility!=="hidden"&&getComputedStyle(s.parentNode).display!=="none"}const de=n.forwardRef(({defaultActiveIndex:s=0,...r},l)=>{const{as:u="div",bsPrefix:m,slide:c=!0,fade:fe=!1,controls:he=!0,indicators:M=!0,indicatorLabels:D=[],activeIndex:p,onSelect:v,onSlide:S,onSlid:T,interval:y=5e3,keyboard:K=!0,onKeyDown:$,pause:N="hover",onMouseOver:A,onMouseOut:L,wrap:I=!0,touch:B=!0,onTouchStart:O,onTouchMove:_,onTouchEnd:X,prevIcon:me=o.jsx("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:V="Previous",nextIcon:pe=o.jsx("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:q="Next",variant:Y,className:ve,children:H,...xe}=De({defaultActiveIndex:s,...r},{activeIndex:"onSelect"}),f=F(m,"carousel"),R=$e(),E=n.useRef(null),[z,G]=n.useState("next"),[Ce,k]=n.useState(!1),[b,J]=n.useState(!1),[a,Ne]=n.useState(p||0);n.useEffect(()=>{!b&&p!==a&&(E.current?G(E.current):G((p||0)>a?"next":"prev"),c&&J(!0),Ne(p||0))},[p,b,a,c]),n.useEffect(()=>{E.current&&(E.current=null)});let x=0,Q;Ae(H,(e,t)=>{++x,t===p&&(Q=e.props.interval)});const Z=Le(Q),i=n.useCallback(e=>{if(b)return;let t=a-1;if(t<0){if(!I)return;t=x-1}E.current="prev",v==null||v(t,e)},[b,a,v,I,x]),d=ae(e=>{if(b)return;let t=a+1;if(t>=x){if(!I)return;t=0}E.current="next",v==null||v(t,e)}),P=n.useRef();n.useImperativeHandle(l,()=>({element:P.current,prev:i,next:d}));const ee=ae(()=>{!document.hidden&&Fe(P.current)&&(R?i():d())}),C=z==="next"?"start":"end";He(()=>{c||(S==null||S(a,C),T==null||T(a,C))},[a]);const Re=`${f}-item-${z}`,Ee=`${f}-item-${C}`,be=n.useCallback(e=>{Oe(e),S==null||S(a,C)},[S,a,C]),Se=n.useCallback(()=>{J(!1),T==null||T(a,C)},[T,a,C]),Te=n.useCallback(e=>{if(K&&!/input|textarea/i.test(e.target.tagName))switch(e.key){case"ArrowLeft":e.preventDefault(),R?d(e):i(e);return;case"ArrowRight":e.preventDefault(),R?i(e):d(e);return}$==null||$(e)},[K,$,i,d,R]),ye=n.useCallback(e=>{N==="hover"&&k(!0),A==null||A(e)},[N,A]),Ie=n.useCallback(e=>{k(!1),L==null||L(e)},[L]),ne=n.useRef(0),w=n.useRef(0),te=Ue(),ge=n.useCallback(e=>{ne.current=e.touches[0].clientX,w.current=0,N==="hover"&&k(!0),O==null||O(e)},[N,O]),je=n.useCallback(e=>{e.touches&&e.touches.length>1?w.current=0:w.current=e.touches[0].clientX-ne.current,_==null||_(e)},[_]),ke=n.useCallback(e=>{if(B){const t=w.current;Math.abs(t)>We&&(t>0?i(e):d(e))}N==="hover"&&te.set(()=>{k(!1)},y||void 0),X==null||X(e)},[B,N,i,d,te,y,X]),se=y!=null&&!Ce&&!b,U=n.useRef();n.useEffect(()=>{var e,t;if(!se)return;const h=R?i:d;return U.current=window.setInterval(document.visibilityState?ee:h,(e=(t=Z.current)!=null?t:y)!=null?e:void 0),()=>{U.current!==null&&clearInterval(U.current)}},[se,i,d,Z,y,ee,R]);const re=n.useMemo(()=>M&&Array.from({length:x},(e,t)=>h=>{v==null||v(t,h)}),[M,x,v]);return o.jsxs(u,{ref:P,...xe,onKeyDown:Te,onMouseOver:ye,onMouseOut:Ie,onTouchStart:ge,onTouchMove:je,onTouchEnd:ke,className:j(ve,f,c&&"slide",fe&&`${f}-fade`,Y&&`${f}-${Y}`),children:[M&&o.jsx("div",{className:`${f}-indicators`,children:oe(H,(e,t)=>o.jsx("button",{type:"button","data-bs-target":"","aria-label":D!=null&&D.length?D[t]:`Slide ${t+1}`,className:t===a?"active":void 0,onClick:re?re[t]:void 0,"aria-current":t===a},t))}),o.jsx("div",{className:`${f}-inner`,children:oe(H,(e,t)=>{const h=t===a;return c?o.jsx(_e,{in:h,onEnter:h?be:void 0,onEntered:h?Se:void 0,addEndListener:Xe,children:(g,we)=>n.cloneElement(e,{...we,className:j(e.props.className,h&&g!=="entered"&&Re,(g==="entered"||g==="exiting")&&"active",(g==="entering"||g==="exiting")&&Ee)})}):n.cloneElement(e,{className:j(e.props.className,h&&"active")})})}),he&&o.jsxs(o.Fragment,{children:[(I||p!==0)&&o.jsxs(le,{className:`${f}-control-prev`,onClick:i,children:[me,V&&o.jsx("span",{className:"visually-hidden",children:V})]}),(I||p!==x-1)&&o.jsxs(le,{className:`${f}-control-next`,onClick:d,children:[pe,q&&o.jsx("span",{className:"visually-hidden",children:q})]})]})]})});de.displayName="Carousel";const Be=Object.assign(de,{Caption:ue,Item:ie});export{Be as C};
