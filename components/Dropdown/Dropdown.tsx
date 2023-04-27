"use client";

import { ReactNode, useCallback, useState } from "react";

interface IProps {
  children: ReactNode;
  options: ReactNode[];
  name: string;
}

function Dropdown({ children, options, name = crypto.randomUUID() }: IProps) {
  const [show, setShow] = useState(false);

  const handleClickMain = useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClickMain}
        >
          {children}
        </button>
      </div>
      <menu
        className="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        {options.map((option, i) => (
          <li key={i}>
            <label>
              <span>options</span>
              <input type="radio" />
            </label>
          </li>
        ))}
      </menu>
    </div>
  );
}

export default Dropdown;
