/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = postData(100);
  postMessage(response);
});


export function postData(data: number): number {
  while(data < 1000000) {
    console.log("running on worker ");
    data += 100;
  }
  return data;
}
