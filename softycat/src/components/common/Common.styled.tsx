import styled from "@emotion/styled";
// import { hover } from "@testing-library/user-event/dist/hover";
// import { FC } from 'react'
import { NavLink } from "react-router-dom";

export const CommonContainer = styled('div')({
  position: "relative",
  maxWidth: "1200px",
  margin: " 0 auto",
  padding: "0 16px"
})

export const Header = styled('header')({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // gap: "12px",
  padding: "8px 0",
  marginBottom: "16px",
  borderBottom: "1px solid black"
})

export const Link = styled(NavLink)({
  padding: "8px 16px",
  borderRadius: "4px",
  textDecoration: "none",
  color: "black",
  fontWeight: "500",
  '&.active': { backgroundColor: "orangered" },
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
}
)

export const UpLink = styled(NavLink)({
  padding: "8px 16px",
  borderRadius: "4px",
  textDecoration: "none",
  color: "black",
  fontWeight: "500",
  // '&.active': { backgroundColor: "orangered" },
  ":hover": {
    backgroundColor: "Highlight",
    cursor: "pointer"
  }
}
)

export const LinkToFamily = styled(NavLink)({
  transition: " opacity ",
  textDecoration: "none",
  ":hover": {
    opacity: "0.8",
    cursor: "pointer"
  }
})

export const NavStart = styled('nav')({
  display: "flex",
  justifyContent: "space-between",
  // alignSelf: "start"
})
export const NavEnd = styled('nav')({
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",

  // alignSelf: "end"
})


export const Logo = styled('p')({
  fontWeight: "700",
  margin: "0"
})

// interface ComponentProps {
//   to: string,
//   className?: string,
//   children: any
// }

// const Navig: FC<ComponentProps> = ({ to, children }) => (
//   <NavLink to={to} className={({ isActive, isPending }) =>
//     isPending ? "pending" : isActive ? "active" : ""
//   } >{children}</NavLink>
// )




  // &.active{ backgroundColor: "orangered" })

  //   backgroundColor: `${props}=>{props.className={({ isActive }) => isActive ? "active" : ""};
  //   ${props.className}==="active"?"white":"green"`
  //   // props => {
  //   //   props.className === "active" ? {
  //   //     color: "white",
  //   //     backgroundColor: "orangered"
  //   //   } : ""
  // })


  // props => {
  //   console.log(props);
  //   if (props.className === "active") return {
  //     color: "white",
  //     backgroundColor: "orangered"
  //   }
  // })


// export function Navbar(props: React.AllHTMLAttributes<HTMLElement>) {
//   return (
//     <NavbarDiv>
//       <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
//         Home
//       </NavLink>
//       <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
//         About
//       </NavLink>
//     </NavbarDiv>
//   )
// }

// const NavbarDiv = styled('div')({
//   width: "100 %",
//   height: "85px",
//   backgroundColor: "#242424",
//   color: "blue",
//   boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .25)"
// })




