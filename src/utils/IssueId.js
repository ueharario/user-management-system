const issueId = (users, user) => {
    const _id = Math.floor(Math.random() * 100) + 1
    if (users.some((v) => v.id === _id)) {
        issueId(users, user)
    }
    else {
        return user.id = _id
    }
}

export default issueId