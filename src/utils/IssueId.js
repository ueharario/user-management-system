const issueId = (users, user) => {
    let _id = 1
    let duplication = true
    while (duplication) {
        duplication = users.some((v) => v.id === _id)
        if (duplication) _id++
        else {
        user.id = _id
        break
        }
    }
}

export default issueId