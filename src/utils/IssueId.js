// export default {
//     issueId() {
//         /** 1. id を発番する */
//         const id = 1
//         const target = 0
//         while (target === null) {
//             /** 2. 配列の中に被る id はないかを確認する */
//             target = users.find((v) => { return v.id === user.id})
//             /** 3. 被る場合は 1. に戻る、被らない場合は、id を返す */
//             if (target === null) return id
//             else {
//                 target = null
//                 id++
//             }
//         }
//     }
// }

// 関数は JS に切り出す方が良い。vue に依存しない。this の危険性。