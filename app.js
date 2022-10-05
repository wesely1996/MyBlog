const express = require("express");

const app = express();

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        {
            title: "Telstra Telecom Suffers Data Breach Potentially Exposing Employee Information",
            snippet: "Australia's largest telecommunications company Telstra disclosed that it was the victim of a data breach through a..."
        },
        {
            title: "Experts Warn of New RatMilad Android Spyware Targeting Enterprise Devices",
            snippet: "A novel Android malware called RatMilad has been observed targeting a Middle Eastern enterprise mobile device by concealing itself as a VPN and phone number..."
        },
        {
            title: "FBI, CISA, and NSA Reveal How Hackers Targeted a Defense Industrial Base Organization",
            snippet: "U.S. cybersecurity and intelligence agencies on Tuesday disclosed that multiple nation-state hacking groups..."
        }
    ]
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create A New Blog'});
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});