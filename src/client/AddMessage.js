import React, {useEffect, useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import useForm from "../assets/useForm";
import validateAddMessage from "./validate/validateAddMessage";
import axios from "axios";
import {transformDate} from "../utils/utils";


export default function AddMessage(props) {

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/message")
            .then(response => {
                return response.data.filter((message) => (
                    message.client_id === props.id
                ))
            }).then(clientMessage => {
            setMessages(clientMessage)
        })
            .catch(error => {
                console.log(error)
            });

    }, []);

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    const onSubmit = () => {
        const client = {
            "client_id": props.id,
            "content": values.clientMessage,
        };

        axios.post('http://localhost:8000/message', client)
            .then(response => {
                if (response.data !== null) {
                    window.location.reload(false)
                }
            })
            .catch(error => {
                alert(error)
            });
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(onSubmit, validateAddMessage);


    const Messages = () => {
        if (messages) {
            return (
                messages?.map(message => (
                    <div key={message.id}>
                        <p>
                            Envoyé le : {transformDate(message.sent_at)}
                        </p>
                        <p>
                            {message.content}
                        </p>
                    </div>
                ))
            )
        }
        return false;
    };

    return (
        <Container component="main" maxWidth="xs" className={"add-client"}>
            <CssBaseline/>
            <div>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <div className="control">
                        <TextareaAutosize
                            className={`input`}
                            variant="outlined"
                            margin="normal"
                            required
                            id="clientMessage"
                            label="Message"
                            name="clientMessage"
                            autoComplete="clientMessage"
                            autoFocus
                            type={"textarea"}
                            onChange={handleChange}
                        />
                        {errors.clientMessage && (
                            <p className="help is-danger">{errors.clientMessage}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Envoyer le message
                    </Button>
                </form>
                <Messages/>
            </div>
        </Container>
    );
}
