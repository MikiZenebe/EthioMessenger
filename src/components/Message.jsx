import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

const Message = forwardRef(({ message, username }, ref) => {
	const isUser = username === message.username;
	return (
		<Main>
			<div ref={ref} className={`chat-card ${isUser && "message-user"} `}>
				<Card className={isUser ? "message-userCard" : "message-guest"}>
					<CardContent>
						<Typography variant='h5' component='h2'>
							{!isUser && `${message.username || "Unkown User"}: `} {message.message}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</Main>
	);
});

const Main = styled.div`
	.chat-card {
		padding: 10px;
		margin: 10px;
		width: fit-content;
	}

	.message-user {
		margin-left: auto;

		text-align: left !important;
	}

	.message-userCard {
		background-color: #0b81ff !important;
		color: white;
	}

	.message-guest {
		background-color: #ffffff !important;
	}
`;
export default Message;
