import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import Message from "./Message";

function Ui() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		{ username: "Micky", text: "Whats up" },
		{ username: "Natu", text: "Bitch" },
	]);
	const [username, setUsername] = useState("");

	useEffect(() => {
		setUsername(prompt("Please insert username"));
	}, []);

	//EVENTS
	const sendMessage = (e) => {
		setMessages([...messages, { username: username, text: input }]);
		setInput("");
		e.preventDefault(); //Stop refreshing
	};
	const inputHandler = (e) => {
		setInput(e.target.value);
	};
	return (
		<div>
			<h1>Messganger Clone</h1>
			<h2>Welcome {username}</h2>
			<form>
				<FormControl>
					<InputLabel>Send a message...</InputLabel>
					<Input value={input} onChange={inputHandler} />

					<Button
						disabled={!input}
						variant='contained'
						type='submit'
						onClick={sendMessage}
					>
						Send Message
					</Button>
				</FormControl>
			</form>

			{messages.map((message) => (
				<Message username={message.username} text={message.text} />
			))}
		</div>
	);
}

export default Ui;
