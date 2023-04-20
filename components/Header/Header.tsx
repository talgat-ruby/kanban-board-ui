import LogoContainer from "@/components/LogoContainer";

function Header() {
  return (
    <header className="fixed w-full h-[--header-height] flex bg-light-1 dark:bg-dark-3">
      <LogoContainer className="w-[--sidebar-width] box-content border-r border-light-2 dark:border-dark-2" />
    </header>
  );
}

export default Header;
