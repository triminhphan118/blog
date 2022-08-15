import { useDropdown } from "./dropdown-context";

function DropdownList({ children }) {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
}
export default DropdownList;
