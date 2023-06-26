const normalizeStringForSearch = (str: string) => str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

export default normalizeStringForSearch;
