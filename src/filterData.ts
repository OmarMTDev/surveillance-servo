class Data {
    startDay: string;
    status: string;
}

export function getDaysByStatus (data: Data[], jobStatus: string): string[]{
    let result =[] ;
    data.forEach((entry: Data)=> {
        if (entry.status === jobStatus){
            result.push(entry.startDay);
        }
       });

   return result;
}


