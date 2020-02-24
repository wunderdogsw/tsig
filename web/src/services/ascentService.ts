import { History } from "history";
import { Dispatch } from "redux";

import {
  Ascent,
  AscentDto,
  mapAscentDtoToAscent,
  sortByDate,
  mapAscentToUpsertAscent,
  addToAscents,
  addManyToAscents,
  editInAscents,
  removeFromAscents,
  AscentStatus,
  filterByStatus,
  clearStatus
} from "../types/ascent";
import {
  get,
  post,
  put,
  remove,
  TokenExpiredError
} from "../clients/apiClient";
import { setLocalAscents, getLocalAscents } from "../clients/storageClient";
import {
  add as addAction,
  addMany as addManyAction,
  edit as editAction,
  remove as removeAction
} from "../ducks/ascent";
import {
  addSuccess,
  addWarning,
  addInfo,
  addError
} from "../ducks/notification";

const ASCENT_API_PATH = "ascents";
const BATCH_SIZE = 100;

type AscentsResponse = { ascents: AscentDto[] };

const handleApiError = (error: any, dispatch: Dispatch, history: History) => {
  if (error instanceof TokenExpiredError) {
    const navigate = () => history.push("/login");
    dispatch(addWarning("Please sign in. Redirecting to login...", navigate));
  } else {
    dispatch(addWarning("Backend unavailable. Please sync later."));
  }
};

export const fetchAscents = async () => {
  const json = await get<AscentsResponse>(ASCENT_API_PATH);
  const ascents = json.ascents.map(mapAscentDtoToAscent).sort(sortByDate);
  await setLocalAscents({ ascents });
  return ascents;
};

export const addAscent = async (
  ascent: Ascent,
  dispatch: Dispatch,
  history: History
) => {
  const state = await getLocalAscents();
  try {
    await saveAscentToBackend(ascent);
    dispatch(addSuccess("Ascent added."));
  } catch (error) {
    ascent.status = AscentStatus.PendingAdd;
    handleApiError(error, dispatch, history);
  }
  await setLocalAscents({ ascents: addToAscents(state.ascents, ascent) });
  dispatch(addAction(ascent));
};

export const addAscents = async (
  ascents: Ascent[],
  dispatch: Dispatch,
  history: History
) => {
  dispatch(addInfo(`Adding ${ascents.length} ascents...`));
  const data = ascents.map(ascent => mapAscentToUpsertAscent(ascent));
  const promises = [];
  for (let i = 0; i < data.length; i = i + BATCH_SIZE) {
    promises.push(
      post(`${ASCENT_API_PATH}/bulk`, data.slice(i, i + BATCH_SIZE))
    );
  }
  const state = await getLocalAscents();
  try {
    await Promise.all(promises);
    await setLocalAscents({
      ascents: addManyToAscents(state.ascents, ascents)
    });
    dispatch(addManyAction(ascents));
  } catch (error) {
    handleApiError(error, dispatch, history);
    dispatch(addError(`Failed to import ascents: ${error.message}`));
  }
};

export const editAscent = async (
  id: string,
  ascent: Ascent,
  dispatch: Dispatch,
  history: History
) => {
  const state = await getLocalAscents();
  try {
    await saveAscentToBackend(ascent, id);
    dispatch(addSuccess("Ascent changed."));
  } catch (error) {
    ascent.status =
      ascent.status === AscentStatus.PendingAdd
        ? AscentStatus.PendingAdd
        : AscentStatus.PendingEdit;
    handleApiError(error, dispatch, history);
  }
  await setLocalAscents({ ascents: editInAscents(state.ascents, ascent) });
  dispatch(editAction(ascent));
};

export const removeAscent = async (
  ascent: Ascent,
  dispatch: Dispatch,
  history: History
) => {
  const state = await getLocalAscents();
  try {
    if (ascent.status !== AscentStatus.PendingAdd) {
      await removeAscentFromBackend(ascent.id);
    }
    await setLocalAscents({
      ascents: removeFromAscents(state.ascents, ascent.id)
    });
    dispatch(removeAction(ascent.id));
    dispatch(addSuccess("Ascent removed."));
  } catch (error) {
    ascent.status = AscentStatus.PendingRemove;
    handleApiError(error, dispatch, history);
    await setLocalAscents({ ascents: editInAscents(state.ascents, ascent) });
    dispatch(editAction(ascent));
  }
};

export const syncAscents = async (dispatch: Dispatch, history: History) => {
  const { ascents } = await getLocalAscents();
  const toAdd = ascents.filter(filterByStatus(AscentStatus.PendingAdd));
  const toEdit = ascents.filter(filterByStatus(AscentStatus.PendingEdit));
  const toRemove = ascents.filter(filterByStatus(AscentStatus.PendingRemove));
  dispatch(
    addInfo(
      `Syncing ascents: Adding ${toAdd.length} ascents, changing ${toEdit.length} ascents and removing ${toRemove.length} ascents.`
    )
  );
  const promises = [
    ...toAdd.map(ascent => saveAscentToBackend(ascent)),
    ...toEdit.map(ascent => saveAscentToBackend(ascent, ascent.id)),
    ...toRemove.map(ascent => removeAscentFromBackend(ascent.id))
  ];
  try {
    await Promise.all(promises);
  } catch (error) {
    handleApiError(error, dispatch, history);
    return;
  }
  const editedAscents = [...toAdd.map(clearStatus), ...toEdit.map(clearStatus)];
  const newAscents = [
    ...ascents.filter(filterByStatus(undefined)),
    ...editedAscents
  ];
  await setLocalAscents({ ascents: newAscents });
  editedAscents.forEach(ascent => dispatch(editAction(ascent)));
  toRemove.forEach(ascent => dispatch(removeAction(ascent.id)));
};

const saveAscentToBackend = async (ascent: Ascent, id?: string) => {
  const data = mapAscentToUpsertAscent(ascent);
  if (id !== undefined) {
    await put<AscentDto>(ASCENT_API_PATH, id, data);
    return;
  }
  await post<AscentDto>(ASCENT_API_PATH, data);
};

const removeAscentFromBackend = async (ascentId: string) => {
  await remove(ASCENT_API_PATH, ascentId);
};
