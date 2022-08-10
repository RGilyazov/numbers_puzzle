//it should be some API for saving data in remote database,
//i will pretend i have it.

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function saveDataAPI(name, data) {
  try {
    await timeout(1000);
    localStorage.setItem(name, JSON.stringify(data));
  } catch (e) {
    return { error: e };
  }
  return { succes: true };
}

export async function loadDataAPI(name) {
  let Value = {};
  try {
    const saved = localStorage.getItem(name);
    Value = JSON.parse(saved);
    await timeout(3000);
  } catch (e) {
    return { error: e };
  }
  return Value || {};
}
