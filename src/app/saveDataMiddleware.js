import { saveDataAPI, loadDataAPI } from "../api/saveDataAPI";
export const saveDataMiddleware = (store) => (next) => (action) => {
  if (action.type === "puzzleGame/saveGame") {
    saveDataAPI("puzzleGame/data", action.payload).then((result) => {
      action.payload = result;
      next(action);
    });
    return;
  }
  if (action.type === "puzzleGame/loadGame") {
    loadDataAPI("puzzleGame/data").then((result) => {
      action.payload = result;
      next(action);
    });
    return;
  }
  return next(action);
};
