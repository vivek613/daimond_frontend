import { useState } from "react";

export const useProduct = () => {
  const [open, setOpen] = useState();
  const [search, setSearch] = useState("");

  const value = {
    open,
    setOpen,
    search,
    setSearch,
  };
  return {
    value,
  };
};
