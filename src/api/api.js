const ApiGetUserData = ( callback ) => {
    fetch('../..//public/json/data.json')
        .then(response => {
            return response.json()
        })
        .then(json => {
            callback( json.userData )
        })
        .catch(error => console.log('error', error))
}

export { ApiGetUserData }