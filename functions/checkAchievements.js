const User = require('../models/User')
const mongoose = require('mongoose')
const jsonRules = require('json-rules-engine')
const achievementRules = require('./achievementRules')
const checkForDuplicates = require('./checkForDuplicates')


let engine = new jsonRules.Engine()

const checkAchievements = async(userSteps) => {


    engine.addRule(achievementRules.k1Rule)
    engine.addRule(achievementRules.k5Rule)
    engine.addRule(achievementRules.k10Rule)
    engine.addRule(achievementRules.k20Rule)

    let facts = {stepAmount: userSteps}

    const result = await engine.run(facts)

    checkForDuplicates(result.events)

    return result.events
}

module.exports =  checkAchievements