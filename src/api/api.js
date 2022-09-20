/** コールバックを使った場合 */
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

/** Promise で書こうと思ったが上手くいかない */
// const ApiGetUserData = () => {
//     const promise = new Promise(() => {
//         fetch('/json/data.json')
//             .then(response => {
//                 return response.json()
//             })
//             .then(json => {
//                 return json.userData
//             })
//             .catch(error => console.log('error', error))
//     })
//     return promise
// }

/** JS のドキュメントを見たら、promise はこれでも良いらしい。コールバック使った時と一緒!?? */
// const ApiGetUserData = fetch('json/data.json').then(response => { return response.json() }).then(json => { return json.userData })

/** Promise で書く。return は使わない。resolve と reject で。 */
const ApiGetUserData = () => {
    const promise = new Promise((resolve, reject) => {
        fetch('/json/data.json')
            .then(response => resolve(response.json()))
            .then(json => resolve(json.userData))
            .catch(error => reject('error', error))
    })
    return promise
}

export { ApiGetUserData }