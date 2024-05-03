import staticData from '../static-data/staticData.json'
import { get } from 'lodash';

const retrieveStatic = (moduleName) => {
  // Default this to JP for now
  let data = staticData;
  // const locale = process.env.REACT_APP_LN
  // if (locale === 'en') data = en;
  return (field, variables) => {
    if (typeof variables == 'undefined') {
      return get(data[moduleName], field, field);
    }

    var regex = new RegExp(':(' + Object.keys(variables).join('|') + ')', 'g');

    const stringValue = get(data[moduleName], field, field);

    return stringValue.replace(regex, (m, $1) => variables[$1] || m);
  };
};

export default retrieveStatic;
