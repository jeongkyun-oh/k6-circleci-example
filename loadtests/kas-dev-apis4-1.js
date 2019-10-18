import { sleep } from "k6";
import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 50 },
    { duration: "60s", target: 50 },
    { duration: "10s", target: 0 }
  ],
  ext: {
    loadimpact: {
      distribution: {
        "Seoul - KR": { loadZone: "amazon:kr:seoul", percent: 100 }
      }
    }
  }
};

export default function() {
  let response;

  // pokemon
  response = http.get("https://kas.dev.klaytn.com/pokemon/123");
  check(response, {'is status 200': (r) => r.status == 200 });

  // kct
  response = http.get("https://kas.dev.klaytn.com/v1/kct", {
    headers: {
      "x-kas-project-id": "f349c812a0f8b3b344ca2931ff95632d78c3cda8",
      "x-kas-project-token": "4b53fe5d1e4595ae703dbb3436fe0292da6eccdc"
    }
  });
  check(response, {'is status 200': (r) => r.status == 200 });

  // klay_getBlockNumber
  response = http.post(
    "https://kas.dev.klaytn.com/v1/klaytn",
    '{"jsonrpc":"2.0","method":"klay_blockNumber","params":[],"id":0}',
    {
      headers: {
        "x-kas-project-id": "345462393eaee305692d287cc691731028d4d350",
        "x-kas-project-token": "e4232eccc79e9f93caa3817d92b213da3d576132",
        "Content-Type": "text/plain"
      }
    }
  );
  check(response, {'is status 200': (r) => r.status == 200 });
  sleep(0.2);
}
