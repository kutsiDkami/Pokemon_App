
const Reducer = (state: any, action: any) => {
  //console.log(action);

  switch (action.type) {
    case "FIRST_DATA":
      return {
        ...state,
        data: action.data,
        loading: action.loading,
        Offset: action.Offset,
        hasNextPage: action.hasNextPage,
        error: "",
      };

    case "CHANCE_DATA":
      return {
        ...state,
        data: [...state.data, ...action.data],
        loading: action.loading,
        hasNextPage: action.hasNextPage,
        Offset: action.Offset,
        error: "",
      };

    case "LODING":
      return { ...state, loading: true };
    case "ERROR":
      return { ...state, data: "", loading: false, error: action.error };
    case "DETAIL_DATA":
      return { ...state, detailData: action.detailData };
    // case "PAGINATE_DATA":
    //   return {
    //     ...state,
    //     detailData: action.detailData,
    //     currentPage: action.currentPage,// Şu anki sayfa
    //     postsPerPage: action.postsPerPage,// Sayfa başına gösterilecek öğe sayısı
    //     totalPosts: action.totalPosts // Toplam öğe sayısı
    //   };
    default:
      return { ...state };
  }
}
export default Reducer
