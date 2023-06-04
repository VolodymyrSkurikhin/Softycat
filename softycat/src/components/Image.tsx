import { StyledImage } from "./Image.styled";

export const Image = ({ src = "./Images/defaultcat.webp", alt, width }: { src?: string; alt: string; width: string }) => {
  return (<StyledImage src={src} alt={alt} width={width} />)
};