export const checkAddressType = (
  arrayId: string[] | undefined,
  id: string
): boolean => {
  return !!arrayId?.includes(id);
};
