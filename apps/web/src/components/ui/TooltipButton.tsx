import { Button, type ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type TooltipButtonProps = ButtonProps & {
	tooltipLabel: string;
};

export const TooltipButton = ({
	tooltipLabel: toolbarText,
	...props
}: TooltipButtonProps) => {
	return (
		<Tooltip delayDuration={50}>
			<TooltipTrigger asChild>
				<Button {...props} />
			</TooltipTrigger>
			<TooltipContent sideOffset={5}>{toolbarText}</TooltipContent>
		</Tooltip>
	);
};
