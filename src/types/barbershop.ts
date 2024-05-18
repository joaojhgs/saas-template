export type IBarbershop = {
  name: string;
  picture: string;
  description: string;
  id: string;
};

export type IUpdateBarbershopInput = {
  name?: string;
  picture?: string;
  description?: string;
};
