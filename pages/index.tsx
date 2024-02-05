import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Message>();
  const [ws, setWS] = useState<any>(null);

  useEffect(() => {
    if (ws === null) {
      const newWS = new WebSocket("ws://localhost:8000/ws/trades/aapl")
      newWS.onerror = (err) => console.error(err);
      newWS.onopen = () => setWS(newWS)
    }
  }, [ws])

  useEffect(() => {
    if (ws) {
      ws.onmessage = (msg: any) => setData(JSON.parse(msg.data))
    }
    console.log(data)
  }, [data, ws])

  return (
    <>
      <p>{`Price : ${data?.p}`}</p>
    </>
  );
}

interface Message {
  s: string,
  p: number,
  v: number,
  t: number,
}
