// import Search from "../../components/Search";
// const { default: Category } = require("../../components/Category");
const { useGet } = require("./useGet");
const { URL_BASE } = require("../../Constants/api");

export const useSearch = (media, search, page = 1, subsearch = false, searchParams = false) => {
  const endpoints = {
    trending: `trending/${media}/week`,
    category: `${media}/${search}`,
    subsearch: `${media}/${search}/${subsearch}`,
    search: "search/multi",
    genre: `discover/${media}`
  };

  const query = media === "multi" ? `&query=${search}` : "";
  const genres = searchParams ? `&with_genres=${searchParams}` : ""
  let endpoint;
  if (media === "multi") {
    endpoint = endpoints.search;
  } else if (subsearch) {
    endpoint = endpoints.subsearch
  } else if (searchParams) {
    endpoint = endpoints.genre
  } else {
    endpoint = endpoints[search] ? endpoints[search] : endpoints.category;
  }



  return useGet(
    `${URL_BASE}/${endpoint}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}${query || genres}&language=es-ES`
  );
};
