import { Link, To } from "react-router-dom";
import { ButtonProps, Button } from "./button";

type LinkButtonProps = Omit<ButtonProps, "asChild"> & {
  link: To;
};

export const LinkButton = ({ children, ...props }: LinkButtonProps) => {
  return (
    <Button asChild={true} {...props}>
      <Link to={props.link}>
        {children}
      </Link>
    </Button>
  );
}; 
