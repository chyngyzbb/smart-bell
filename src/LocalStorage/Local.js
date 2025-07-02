

export function saveToLocal(value){
    localStorage.setItem("smart",JSON.stringify(value))
}

export function getLocal(){
    const res=JSON.parse(localStorage.getItem('smart'))
    return res
}