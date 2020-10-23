let k1Rule = {
    conditions: {
        all: [{
            fact: 'stepAmount',
            operator: 'greaterThanInclusive',
            value: 1000
        }]
    },
    event: {
        type: 'message',
        params: {
            message: 'Zrobiłeś 1k kroków'
        }
    }
}

let k5Rule = {
    conditions: {
        all: [{
            fact: 'stepAmount',
            operator: 'greaterThanInclusive',
            value: 5000
        }]
    },
    event: {
        type: 'message',
        params: {
            message: 'Zrobiłeś 5k kroków'
        }
    }
}

let k10Rule = {
    conditions: {
        all: [{
            fact: 'stepAmount',
            operator: 'greaterThanInclusive',
            value: 10000
        }]
    },
    event: {
        type: 'message',
        params: {
            message: 'Zrobiłeś 10k kroków'
        }
    }
}

let k20Rule = {
    conditions: {
        all: [{
            fact: 'stepAmount',
            operator: 'greaterThanInclusive',
            value: 20000
        }]
    },
    event: {
        type: 'message',
        params: {
            message: 'Zrobiłeś 20k kroków'
        }
    }
}


module.exports = {
    k1Rule,
    k5Rule,
    k10Rule,
    k20Rule
}