

export function getLocalStorage(){
    const res=JSON.parse(localStorage.getItem("smartOne"))||[]
    return res
}
export function getLocalStorageTwo(){
    const res=JSON.parse(localStorage.getItem("smartTwo"))||[]
    return res
}

export function setLocalStorage(val){
    localStorage.setItem("smartOne",JSON.stringify(val))
}
export function setLocalStorageTwo(val){
    localStorage.setItem("smartTwo",JSON.stringify(val))
}