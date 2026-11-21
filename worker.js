export default {
  async fetch(request) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8",
    };

    if (method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const phone = url.searchParams.get("phone");
    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Phone parameter is required" }),
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }

    const codeType = 2;
    const language = 0;
    const random = "46f3a9943d5f44b09c833a8f3c6709b8";
    const signature = "5EB56A2414B3763EB69241F2827F565B";
    const timestamp = Math.floor(Date.now() / 1000);

    const targetUrl = "https://crbbb.com/api/webapi/SmsVerifyCode";

    const payload = {
      phone,
      codeType,
      language,
      random,
      signature,
      timestamp,
    };

    const upstreamHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 13; 220333QAG Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/133.0.6943.137 Mobile Safari/537.36 w2n/Android w2n/Android",
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Content-Type": "application/json",
      "sec-ch-ua-platform": '"Android"',
      "sec-ch-ua":
        '"Not(A:Brand";v="99", "Android WebView";v="133", "Chromium";v="133"',
      "sec-ch-ua-mobile": "?1",
      "ar-origin": "https://hgzy.bio",
      origin: "https://hgzy.bio",
      "x-requested-with": "com.wnapp.id1723797030457",
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://hgzy.bio/",
      "accept-language": "en-US,en;q=0.9",
      priority: "u=1, i",
    };

    try {
      const upstreamRes = await fetch(targetUrl, {
        method: "POST",
        headers: upstreamHeaders,
        body: JSON.stringify(payload),
      });

      const httpCode = upstreamRes.status;
      const rawText = await upstreamRes.text();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(rawText);
      } catch (e) {
        parsedResponse = rawText;
      }

      return new Response(
        JSON.stringify({
          status: httpCode,
          response: parsedResponse,
        }),
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          status: 500,
          response: { error: err.message || "Request failed" },
        }),
        {
          status: 200,
          headers: corsHeaders,
        }
      );
    }
  },
};
