import { useRef } from "react";
import ButtonToggleSearchModal from "./components/buttons/ButtonToggleSearchModal";
import Header from "./components/landmarks/Header";
import Logo from "./components/Logo";
import SearchModal from "./components/SearchModal";

function Root() {
  const searchModalRef = useRef<HTMLDialogElement>(null);

  const toggleSearchModal = () => {
    if (!searchModalRef.current) {
      return;
    }

    const modalEl = searchModalRef.current;

    if (modalEl.hasAttribute("open")) {
      modalEl.close();
    } else {
      modalEl.showModal();
    }
  };

  return (
    <>
      <Header className="flex flex-wrap justify-between items-center gap-4 relative">
        <Logo />
        <div className="flex jusify-end gap-4">
          <ButtonToggleSearchModal onClick={toggleSearchModal} />
        </div>
        <SearchModal ref={searchModalRef} />
      </Header>
    </>
  );
}

export default Root;
