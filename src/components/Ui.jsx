import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Ui() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		{ username: "Micky", message: "Whats up" },
		{ username: "Natu", message: "Bitch" },
	]);
	const [username, setUsername] = useState("");

	useEffect(() => {
		db
			.collection("message")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
				);
			});
	}, []);

	useEffect(() => {
		setUsername(prompt("Please insert username"));
	}, []);

	//EVENTS
	const sendMessage = (e) => {
		//setMessages([...messages, { username: username, message: input }]);
		setInput("");
		e.preventDefault(); //Stop refreshing

		db.collection("message").add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};
	const inputHandler = (e) => {
		setInput(e.target.value);
	};
	return (
		<div>
			<h1>Ethio Messenger</h1>
			<h2>{username} እንኳን ደህና መጡ</h2>
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

			<FlipMove>
				{messages.map(({ id, message }) => (
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
		</div>
	);
}

export default Ui;
