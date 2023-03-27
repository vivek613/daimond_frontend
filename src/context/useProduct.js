import React, { useState } from "react";

export const useProduct = () => {
  const [open, setOpen] = useState();

  const value = {
    open,
    setOpen,
  };
  return {
    value,
  };
};
