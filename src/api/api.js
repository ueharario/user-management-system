/** callback を使った場合 */
// const ApiGetUserData = ( callback ) => {
//     fetch('/json/data.json')
//         .then(response => {
//             return response.json()
//         })
//         .then(json => {
//             callback( json.userData )
//         })
//         .catch(error => console.log('error', error))
// }

/** Promise を使った場合 */
const ApiGetUserData = () => {
    const promise = new Promise((resolve) => {
        fetch('/json/data.json')
            .then(response => resolve(response.json()))
            // .then(json => resolve(json.userData))
            // .catch((error) => { resolve(null); console.log(error) })
    })
    return promise
}

const ApiGetStatus = () => {
    const promise = new Promise((resolve) => {
        fetch('/json/status.json')
            .then(response => resolve(response.json()))
    })
    return promise
}

export { ApiGetUserData, ApiGetStatus }