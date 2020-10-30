import { MEDIA, CATEGORY } from "../../Constants/i18n";

export const useTitle = (media, search) => {
  if (search === "trending") {
    return `${MEDIA[media]} que son tendencias`;
  }

  if (media === "multi") {
    return `Resultados de: ${search}`;
  }

  if (media === "Género") {
    return `Género: ${search}`;
  }
  const parsedTitle = `${MEDIA[media]} ${CATEGORY[search]}`;

  return parsedTitle;
};
