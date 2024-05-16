const express = require("express");

const app = express();

const url = "https://vouchers-be-dev.plutos.one/api/v1"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJpZCI6ImQzMzQ0M2QyLTNmNjEtNDBiMi1iZWY3LTFhNzdjODg4Mzc0ZCIsInVzZXJuYW1lIjoiaGFnZ3JzaDAwMUBwbHV0b3Mub25lIiwic2VjcmV0X2tleSI6IiQyYiQxMCROU1Uzd1RUZ2ZjeFdNZmVxNVoxZjlleU9rbUtvbkR5RTFnQUVlTGRhUDZrRzBjQUIzRUY5bSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMDRUMDU6MTE6MDcuMDAwWiIsIm1vZGlmaWVkX2F0IjoiMjAyNC0wMy0wNFQwNToxMTowNy4wMDBaIiwiaXNfZGVsZXRlZCI6MCwiY2FtcGFpZ25faWQiOiIxMjdiOGJkYi03MGE5LTQ5ZTMtYTVlNi04ZGNmOWFlNjkyMzgifV0sImlhdCI6MTcxNTg2Mzc2MCwiZXhwIjoxNzE1ODg4OTYwfQ.Z4xyV_NT3e4s9MWgKZSJ7pDPqwYhjLThRCioZsWuScUxHASBg"

app.get("/checkDomain", async (req, res) => {
    try {
        console.log("Hitting domain");
        fetch(url + "/auth/generate/token", {
            method: "GET",
            headers: {
                "Authorization": token
            }
        })
        .then(result => {
            console.log(result);
            return res.send(result)})
        .catch(err => res.send(err))
    } catch (error) {
        res.send(error.message)
    }
});

app.get("/checkLimit", (req, res) => {
    try {
        const requests = []
        for (let i = 0; i < 100; i++) {
            requests.push(fetch(url + "/voucher/category", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }))
        }
        Promise.all(requests)
            .then(result => res.send(result))
            .catch(err => res.send(err.message));
    } catch (error) {
        res.send(error.message);
    }
});

app.get("/checkOverlimit", (req, res) => { 
    try {
        const requests = []
        for (let i = 0; i < 150; i++) {
            requests.push(fetch(url + "/voucher/category", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }))
        }
        Promise.all(requests)
            .then(result => res.send(result))
            .catch(err => res.send(err.message));
    } catch (error) {
        res.send(error.message);
    }
});


app.listen(8080, () => {
    console.log("Listening On Port 8080");
})