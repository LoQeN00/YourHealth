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
            message: '1k Steps'
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
            message: '5k Steps'
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
            message: '10k Steps'
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
            message: '20k Steps'
        }
    }
}


module.exports = {
    k1Rule,
    k5Rule,
    k10Rule,
    k20Rule
}