import clsx from "clsx";
import LogoDark from "@/components/Icons/LogoDark";

interface IProps {
  className?: string;
}

function LogoContainer({ className }: IProps) {
  return (
    <figure className={clsx("flex items-center", className)}>
      <LogoDark className="ml-[2.125rem]" />
    </figure>
  );
}

export default LogoContainer;
