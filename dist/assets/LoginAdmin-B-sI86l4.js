import{r as i,y as d,j as e,H as c,F as s,B as h}from"./index-C6iN-f8T.js";import{C as u}from"./Container-CeyNV1qF.js";const x=()=>{const[t,r]=i.useState(""),[n,o]=i.useState(""),l=d(),m=a=>{a.preventDefault(),t==="admin"&&n==="admin"?(localStorage.setItem("isAdmin","true"),l("/admin")):alert("Špatné přihlašovací údaje")};return e.jsxs(u,{className:"my-4",children:[e.jsxs(c,{children:[e.jsx("title",{children:"Admin Login - Můj Eshop"}),e.jsx("meta",{name:"description",content:"Přihlaste se do administrace našeho e-shopu."})]}),e.jsx("h2",{children:"Admin Přihlášení"}),e.jsxs(s,{onSubmit:m,children:[e.jsxs(s.Group,{className:"mb-3",children:[e.jsx(s.Label,{children:"Uživatelské jméno"}),e.jsx(s.Control,{type:"text",value:t,onChange:a=>r(a.target.value)})]}),e.jsxs(s.Group,{className:"mb-3",children:[e.jsx(s.Label,{children:"Heslo"}),e.jsx(s.Control,{type:"password",value:n,onChange:a=>o(a.target.value)})]}),e.jsx(h,{variant:"primary",type:"submit",children:"Přihlásit se"})]})]})};export{x as default};
