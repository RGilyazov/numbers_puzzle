import { saveDataAPI, loadDataAPI } from "../api/saveDataAPI";
import { toast } from "react-toastify";

function _saveDataPromise(next, action) {
  return new Promise(function (resolve, reject) {
    saveDataAPI("puzzleGame/data", action.payload).then((result) => {
      if (result.error) {
        reject();
        return;
      }
      action.payload = result;
      action.success = true;
      next(action);
      if (action.success) resolve();
      else reject();
    });
  });
}

function _loadDataPromise(next, action) {
  return new Promise(function (resolve, reject) {
    loadDataAPI("puzzleGame/data").then((result) => {
      if (result.error) {
        reject();
        return;
      }
      console.log(result);
      action.payload = result;
      action.success = true;
      next(action);
      if (action.success) resolve();
      else reject();
    });
  });
}

export const saveDataMiddleware = (store) => (next) => (action) => {
  if (action.type === "puzzleGame/saveGame") {
    toast.promise(_saveDataPromise(next, action), {
      pending: "..saving",
      success: "game saved!",
      error: "failed to save the game!",
    });
    return;
  }
  if (action.type === "puzzleGame/loadGame") {
    toast.promise(_loadDataPromise(next, action), {
      pending: "..loading",
      success: "game loaded!",
      error: "failed to load a game!",
    });
    return;
  }
  return next(action);
};
