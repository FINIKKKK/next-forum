import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useSelectors:TypedUseSelectorHook<RootState> = useSelector