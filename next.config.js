require('dotenv').config()

const {
    GITHUB_CLIENT_ID,
    REPO_FULL_NAME,
    BASE_BRANCH,
} = process.env

module.exports = {
    env: {
        GITHUB_CLIENT_ID,
        REPO_FULL_NAME,
        BASE_BRANCH,
    }
}