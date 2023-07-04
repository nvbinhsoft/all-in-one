import {convertToPlainObject} from "./convert-to-plain-object.util";

export function convertPropsToObject(props: any): any{
 const propsCopy = {...props};

 for (const props in propsCopy) {
   if(Array.isArray(propsCopy[props])) {
      propsCopy[props] = (propsCopy[props] as Array<unknown>).map(item => {
        return convertToPlainObject(item)
      });
   }

   propsCopy[props] = convertToPlainObject(propsCopy[props]);
 }
 return propsCopy;
}
