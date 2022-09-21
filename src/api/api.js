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
            .then(json => resolve(json.userData))
    })
    return promise
}

export { ApiGetUserData }