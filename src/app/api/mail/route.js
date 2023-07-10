import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    console.log(body);

    let response = await fetch('http://'+ process.env.API_HOST +'/api/Mail/send', {
        method: "POST",
        headers: new Headers({
            "Authorization": 'Basic '+ btoa(process.env.API_USERNAME +':'+ process.env.API_PASSWORD),
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body),
        mode: "cors",
        cache: 'default'
    });

    response = await response.json();

    return NextResponse.json({...response});
}