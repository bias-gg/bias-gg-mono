import { Link, type To } from "react-router-dom";
import { Button, ButtonProps } from "./Button";

type LinkButtonProps = Omit<ButtonProps, "asChild"> & {
  link: To;
};

export const LinkButton = ({ children, ...props }: LinkButtonProps) => {
  return (
    <Button asChild={true} {...props}>
      <Link to={props.link}>{children}</Link>
    </Button>
  );
};
