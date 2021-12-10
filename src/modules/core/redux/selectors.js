import _ from 'lodash';
import { MODULE_NAME } from '../const';

export const getCoreState = state => state[MODULE_NAME];

export const getLoading = state => _.get(getCoreState(state), 'loading');

export const getError = state => _.get(getCoreState(state), 'error');
