const ApiGetUserData = ( callback ) => {
    fetch('/json/data.json')
        .then(response => {
            return response.json()
        })
        .then(json => {
            callback( json.userData )
        })
        .catch(error => console.log('error', error))
}

export { ApiGetUserData }