import store from "../Store";
import { errorActions } from "../Store/error";

export const ShowError = (errMessage) => {
  store.dispatch(errorActions.setErrorMessage(errMessage));
  store.dispatch(errorActions.showMessage());
};
