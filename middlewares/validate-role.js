const {response, request} = require('express');

const isAdminRole = (req = request, res = response, next ) => {
     if (!req.user) {
        return res.json({status: 500, error:'Role validation before token'})
    }

    const { role, name } = req.user
    if (role !== 'ADMIN') {
        //return res.status(401).json({error:`${ name } user is not administrator`})
        return res.json({status: 401, error:`${ name } user is not administrator`})
    }

    next();
}

const hasRole = (...roles ) => {
    
    return (req = request, res = response, next ) => {
        if (!req.user) {
            //return res.status(500).json({error:'Role validation before token'})
            return res.json({status: 500, error:'Role validation before token'})
        }

        if ( !roles.includes(req.user.role) ) {
            //return res.status(401).json({error:`${ req.user.name } user is not permitted`})
            return res.json({status: 401, error:`${ req.user.name } user is not permitted`})
        }
        
        next();
    }
   
}

module.exports = {
    isAdminRole,
    hasRole
}