import simpleRestProvider from 'ra-data-simple-rest';
import { BASE_URL } from '../api/api';

const dataProvider = simpleRestProvider(BASE_URL);

export default dataProvider;
