

type DynamicObject = {
    [key: string]: string | number;
  };
  
export type BarsData = { 
    [key: string] : DynamicObject[]; 
}

//   export interface BarsData  {
//     [key: string]: { c: number; h: number; l: number; n: number; o: number; t: string; v: number; vw: number; }[]
// }
  
