const compare = (a,b) => {
    const stepsA = a.steps
    const stepsB = b.steps

    let c = -1
    let comparison = 0

    if(stepsA > stepsB){
        comparison = 1 *c
    }else if(stepsA < stepsB){
        comparison = -1 *c
    }
    return comparison
}


module.exports = compare