import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@mui/material";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import Logo from "../img/logo.png";
import styled from "styled-components";
import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";

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
		<Main>
			<img src={Logo} alt='' style={{ width: 100 }} />
			<h1>Ethio Messenger</h1>
			<h2>{username} እንኳን ደህና መጡ</h2>
			<form className='form'>
				<FormControl className='form-control'>
					<Input
						className='input'
						placeholder='Enter a message...'
						value={input}
						onChange={inputHandler}
					/>

					<IconButton
						className='icon-btn'
						type='submit'
						disabled={!input}
						onClick={sendMessage}
						color='primary'
					>
						<Send />
					</IconButton>
				</FormControl>
			</form>

			<FlipMove>
				{messages.map(({ id, message }) => (
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
		</Main>
	);
}

const Main = styled.div`
	.form {
		padding: 20px;
		position: fixed;
		bottom: 0;
		z-index: 1;
		background-color: #fefeff;
		width: 100%;
		margin: 20px;
	}

	.form-control {
		display: flex !important;
		flex-direction: row !important;
	}

	.icon-btn {
		flex: 0;
	}

	.input {
		flex: 1;
	}
`;
export default Ui;
