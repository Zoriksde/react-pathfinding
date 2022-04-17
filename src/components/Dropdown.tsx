import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

interface DropdownProps<T extends { name: string }> {
  dropdownActive: T;
  dropdownItems: T[];
  onItemClick: (arg: T) => void;
  activeColor: string;
}

const Dropdown = <T extends { name: string }>({
  dropdownActive,
  dropdownItems,
  onItemClick,
  activeColor,
}: DropdownProps<T>) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onDropdownClickHandler = (ev: any): void => {
    if (buttonRef.current && buttonRef.current.contains(ev.target)) {
      setShowDropdown((prevState) => !prevState);
    } else if (
      dropdownRef.current &&
      !dropdownRef.current.contains(ev.target)
    ) {
      setShowDropdown(false);
    }
  };

  const onDropdownItemClick = (dropdownItem: T): void => {
    setShowDropdown(false);
    onItemClick(dropdownItem);
  };

  useEffect(() => {
    document.addEventListener("mousedown", onDropdownClickHandler);

    return () => {
      document.removeEventListener("mousedown", onDropdownClickHandler);
    };
  }, [showDropdown]);

  return (
    <div className="dropdown">
      <div
        className="dropdown-active"
        style={{ backgroundColor: activeColor }}
        ref={buttonRef}
      >
        {dropdownActive.name}
      </div>
      <div
        className={`dropdown-content ${showDropdown && "active"}`}
        ref={dropdownRef}
      >
        {dropdownItems.map((dropdownItem) => {
          return (
            <div
              className="dropdown-item"
              key={dropdownItem.name}
              onClick={onDropdownItemClick.bind(null, dropdownItem)}
            >
              {dropdownItem.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
