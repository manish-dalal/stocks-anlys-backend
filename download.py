import requests

base_url = "https://www.nseindia.com"
session = requests.Session()
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, "
    "like Gecko) "
    "Chrome/80.0.3987.149 Safari/537.36",
    "accept-language": "en,gu;q=0.9,hi;q=0.8",
    "accept-encoding": "gzip, deflate, br",
}

r = session.get(base_url, headers=headers, timeout=15)
cookies = dict(r.cookies)
print(r.cookies)

def fetch_save(url, name):
    response = session.get(
        url,
        timeout=15,
        headers=headers,
        cookies=cookies,
    )
    content = response.content.decode("utf-8")
    # print(content)
    f = open("scrap-data/" + name, "w")  # 'r' for reading and 'w' for writing
    f.write(content + f.name)  # Write inside file
    f.close()


print('Hello    python')
fetch_save(
    "https://www.nseindia.com/api/live-analysis-variations?index=loosers&type=FOSec&csv=true",
    "l3.csv",
)
fetch_save(
    "https://www.nseindia.com/api/live-analysis-variations?index=gainers&type=FOSec&csv=true",
    "g3.csv",
)
fetch_save(
    "https://www.nseindia.com/api/live-analysis-variations?index=loosers&type=NIFTYNEXT50&csv=true",
    "l2.csv",
)
fetch_save(
    "https://www.nseindia.com/api/live-analysis-variations?index=gainers&type=NIFTYNEXT50&csv=true",
    "g2.csv",
)
fetch_save(
    "https://www.nseindia.com/api/live-analysis-variations?index=loosers&type=NIFTY&csv=true",
    "l1.csv",
)
fetch_save(
    "https://www.nseindia.com/api/live-analysis-variations?index=gainers&type=NIFTY&csv=true",
    "g1.csv",
)
fetch_save(
    "https://www.nseindia.com/api/live-analysis-oi-spurts-underlyings?type=underlying&csv=true&partialFileName=By-Underlying",
    "o.csv",
)
