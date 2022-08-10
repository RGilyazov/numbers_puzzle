//it should be some API for saving data in remote database,
//i will pretend i have it.

export async function saveDataAPI(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export async function loadDataAPI(name) {
  const saved = localStorage.getItem(name);
  const initialValue = JSON.parse(saved);
  return initialValue || {};
}
