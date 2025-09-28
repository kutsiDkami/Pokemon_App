
const Reducer = (state, action) => {
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

    default:
      return { ...state };
  }
}
export default Reducer
