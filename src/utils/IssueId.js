const issueId = (users, user) => {
    let _id = Math.floor(Math.random() * 100) + 1
    let duplication = users.some((v) => v.id === _id)
    if (duplication) {
        issueId(users, user)
    }
    else {
        user.id = _id
    }
}

export default issueId