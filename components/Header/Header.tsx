import LogoContainer from "@/components/LogoContainer";
import HeaderInfo from "@/components/HeaderInfo";

interface IProps {
  boardId?: string;
  boardName?: string;
}

function Header({ boardId, boardName = "" }: IProps) {
  return (
    <header className="fixed w-full h-[--header-height] flex bg-light-1 dark:bg-dark-3">
      <LogoContainer className="w-[--sidebar-width] box-content border-r border-light-2 dark:border-dark-2" />
      {boardId && <HeaderInfo boardId={boardId} boardName={boardName} />}
    </header>
  );
}

export default Header;
