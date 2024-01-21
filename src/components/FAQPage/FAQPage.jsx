import "./FAQPage.css";

export default function FAQPage(){
    return (
        <div className = 'container'>
            <h1 className = 'title'>Frequently Asked Questions</h1>
            <div className = 'faqBox'>
                <h1 className="category">I'm not able to register</h1>
                <p>
                        If Overstack isn't allowing you to register, it may be that the username you have chosen is
                    already in use. 
                </p>
                <br/>
                <h1 className="category">Why can't Overstack find my/my friend's Overwatch account?</h1>
                <p>
                        The battle tag search on the Link Account and Add Friend pages is 
                    CASE SENSITIVE. Please ensure you are using proper spelling and
                    capitalization when searching for an account.

                        If you are still receiving error messages, please try refreshing the page
                    and trying again.
                </p>
                <br/>
                <h1 className="category">Why can't I see my/my friend's account rank or stats?</h1>
                <p>
                        The account may be privated. In order to view stats and rank info in 
                    Overstack, the account visibility must be set to public via the in-game
                    settings.
                </p>
                <br/>
                <h1 className="category">My stats aren't up-to-date with the stats on my Career profile in-game</h1>
                <p>
                        Because Overstack relies on Blizzard's public player statistics, the stats
                    seen in this app can only be as accurate as Blizzard provides.
                    Unfortunately, inaccurate player statistics is a known issue on Blizzard's end and
                    cannot be fixed by Overstack.

                        If your competitive stats seem low, it is because competitive statistics are taken
                    only from the most recently available season. 
                </p>
            </div>
        </div>
    )
}