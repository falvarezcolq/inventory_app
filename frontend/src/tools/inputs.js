
export function  onlyNumbers(event){
    const key = event.charCode;
    if (key < 48 || key > 57) {
      event.preventDefault();
    }
}