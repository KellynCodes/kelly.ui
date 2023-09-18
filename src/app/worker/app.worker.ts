/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = postData(10);
  postMessage(response);
});


export function postData(data: number): number {
  while(data < 100) {
    console.log("running on worker ");
    data += 100;
  }
  return data;
}
