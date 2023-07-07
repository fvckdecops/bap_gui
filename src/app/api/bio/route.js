export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const act = searchParams.get('act');
    const path = (act === "detail") ? 'detail?bioId=KsIa5vykj4oalMQMCLlXU53gM9ia4wD5' : 'list';

    let response = await fetch('http://'+ process.env.API_HOST +'/api/Bio/'+ path, {
        method: "GET",
        headers: new Headers({
            "Authorization": 'Basic '+ btoa(process.env.API_USERNAME +':'+ process.env.API_PASSWORD)
        }),
        cache: 'default'
    });

    let data = await response.json();

    return new Response(JSON.stringify(data));
}