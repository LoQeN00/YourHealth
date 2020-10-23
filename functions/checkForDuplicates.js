
const checkForDuplicates = array => {
    for(let i=0;i<array.length;i++) {
        for(let j=i+1;j<array.length;j++) {
            if(array[i].params.message === array[j].params.message )array.splice(j,1)
        }
    }

    try {
        if(array[array.length-2].params.message === array[array.length-1].params.message) array.splice(array.length-1,1)
    } catch {
        
    }
}

module.exports = checkForDuplicates