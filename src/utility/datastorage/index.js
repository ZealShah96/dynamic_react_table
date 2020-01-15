
let data = [];

export function getData() {
    console.log(data);
    return data;

}

export function AddAData() {
    data.push(
        {
            values: {
                name: '', length: '', quantity: '', name: ''
            }
        }
    )
    console.log(data);
    return data;
}

export function RemoveAData(removeIndex) {
    let rows = data;
   
    rows = rows.filter((element, index) => {
        if (index != removeIndex) {
            return element;
        }
    });
    
   data=rows;
}

export function onChangeDataSave(index,element ,e ) {
  
 data[index]["values"][element]=e.target.value;
}

export function setData(tempdata) {
    data.push(tempdata);
}

