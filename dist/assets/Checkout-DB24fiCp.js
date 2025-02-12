import{u as o,r as c,j as e,H as m,F as a,B as h}from"./index-Cb75GjaO.js";import{C as p}from"./Container-DGMVRYUx.js";const j=()=>{const{t:r}=o(),[t,i]=c.useState({firstName:"",lastName:"",address:"",addressNumber:"",city:"",zip:"",email:"",paymentMethod:"card"}),n=s=>{const l=s.target;i({...t,[l.name]:l.value})},d=s=>{s.preventDefault(),alert(r("submitSuccess")),localStorage.removeItem("cart"),window.location.href="/"};return e.jsxs(e.Fragment,{children:[e.jsxs(m,{children:[e.jsx("title",{children:r("checkoutTitle")}),e.jsx("meta",{name:"description",content:r("checkoutDescription")})]}),e.jsxs(p,{children:[e.jsx("h2",{children:r("checkoutTitle")}),e.jsxs(a,{onSubmit:d,children:[e.jsxs(a.Group,{className:"mb-3",controlId:"formFirstName",children:[e.jsx(a.Label,{children:r("firstName")}),e.jsx(a.Control,{type:"text",name:"firstName",value:t.firstName,onChange:n,required:!0,minLength:3,pattern:"^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž]+$",placeholder:r("firstName")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidFirstName")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formLastName",children:[e.jsx(a.Label,{children:r("lastName")}),e.jsx(a.Control,{type:"text",name:"lastName",value:t.lastName,onChange:n,required:!0,minLength:3,pattern:"^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž]+$",placeholder:r("lastName")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidLastName")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formAddress",children:[e.jsx(a.Label,{children:r("address")}),e.jsx(a.Control,{type:"text",name:"address",value:t.address,onChange:n,required:!0,pattern:"^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž\\s]+$",placeholder:r("address")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidAddress")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formAddressNumber",children:[e.jsx(a.Label,{children:r("addressNumber")}),e.jsx(a.Control,{type:"text",name:"addressNumber",value:t.addressNumber,onChange:n,required:!0,pattern:"^\\d+$",placeholder:r("addressNumber")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidAddressNumber")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formCity",children:[e.jsx(a.Label,{children:r("city")}),e.jsx(a.Control,{type:"text",name:"city",value:t.city,onChange:n,required:!0,pattern:"^[A-Za-zÁČĎÉĚÍŇÓŘŠÚŮÝŽáčďéěíňóřšťúůýž\\s]+$",placeholder:r("city")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidCity")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formZip",children:[e.jsx(a.Label,{children:r("zip")}),e.jsx(a.Control,{type:"text",name:"zip",value:t.zip,onChange:n,required:!0,pattern:"^\\d+$",placeholder:r("zip")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidZip")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formEmail",children:[e.jsx(a.Label,{children:r("email")}),e.jsx(a.Control,{type:"email",name:"email",value:t.email,onChange:n,required:!0,pattern:"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.(cz|sk|com|net|org)$",placeholder:r("email")}),e.jsx(a.Control.Feedback,{type:"invalid",children:r("invalidEmail")})]}),e.jsxs(a.Group,{className:"mb-3",controlId:"formPaymentMethod",children:[e.jsx(a.Label,{children:r("paymentMethod")}),e.jsxs(a.Select,{name:"paymentMethod",value:t.paymentMethod,onChange:n,children:[e.jsx("option",{value:"card",children:r("creditCard")}),e.jsx("option",{value:"paypal",children:r("paypal")}),e.jsx("option",{value:"bank",children:r("bankTransfer")})]})]}),e.jsx(h,{variant:"primary",type:"submit",children:r("submit")})]})]})]})};export{j as default};
