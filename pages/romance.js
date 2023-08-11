import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Romance() {
  const [msgInput, setMsgInput] = useState("");
  const [result, setResult] = useState();
  const [lastInput, setLastInput] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: msgInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setMsgInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Reply to this text from my GF:</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="msg"
            placeholder="Enter a message"
            value={msgInput}
            onChange={(e) => {setMsgInput(e.target.value); setLastInput(e.target.value)} }
          />
          <input type="submit" value="Generate replies" />
        </form>
        <div className={styles.result}>Input: {lastInput}</div>
        <div className={styles.result}>Output: {result}</div>
      </main>
    </div>
  );
}
