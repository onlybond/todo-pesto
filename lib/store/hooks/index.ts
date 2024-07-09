import { useDispatch, UseDispatch,useSelector,useStore } from "react-redux";

import type { RootState,AppDispatch,AppStore } from "../store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()