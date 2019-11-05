module.exports = function (req, res, next) {
    let { session } = req

    if (!session.user) {
        session.user = { username: '', cart: [], total: 0 }
    }
    next()
}