//@ desc: open modal
//@ param: setOpen(func)
export const openModal = (setState) => {
  setState(true);
};

//@ desc: close modal
//@ param: setState(func)
export const closeModal = (setState) => {
  setState(false);
};
