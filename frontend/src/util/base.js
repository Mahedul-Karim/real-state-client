export const BASE_URL='https://real-estate-server-bice.vercel.app/api/v1'

export const validateString = (value) => {
    return value?.length < 3 || value === null
      ? "Must have atleast 3 characters"
      : null;
  }