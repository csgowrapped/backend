import express, { Application, Request, Response, NextFunction } from "express"

const app: Application = express();
const port = 3000;
const SteamURL = 'https://steamcommunity.com/openid/login'


function buildLoginUrl(): string {
    const url = new URL(SteamURL);

    url.searchParams.append('openid.ns', 'http://specs.openid.net/auth/2.0')
    url.searchParams.append('openid.mode', 'checkid_setup')
    url.searchParams.append('openid.return_to', 'http://localhost:3000/callback')
    url.searchParams.append('openid.realm', 'http://localhost:3000')
    url.searchParams.append('openid.identity', 'http://specs.openid.net/auth/2.0/identifier_select')
    url.searchParams.append('openid.claimed_id', 'http://specs.openid.net/auth/2.0/identifier_select')

    return url.toString()
}

console.log(buildLoginUrl())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/callback", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query)
    res.status(200).send()
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
