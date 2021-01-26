import { useGithubAuthRedirect } from 'react-tinacms-github'

// Redirect back to here from the GitHub OAuth app
export default function Authorizing() {
    // notify main app that auth code was received
    useGithubAuthRedirect()

    return <h2>
        Authorizing with GitHub, please wait...
    </h2>
}