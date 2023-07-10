export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const act = searchParams.get('act');
    const portfolioId = searchParams.get('portfolioId');
    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');

    const path = (act === "detail" && portfolioId) ? 'detail?portfolioId='+ portfolioId : 'list?offset='+ offset +'&limit='+ limit;
    
    let response = await fetch('http://'+ process.env.API_HOST +'/api/Portfolio/'+ path, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
            "Authorization": 'Basic '+ btoa(process.env.API_USERNAME +':'+ process.env.API_PASSWORD)
        }),
        cache: 'default'
    });

    let data = await response.json();

    return new Response(JSON.stringify(data));
}