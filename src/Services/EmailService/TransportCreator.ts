import {createTransport, Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class TransportCreator{
    private _host: string;
    private _port: string;
    private _user: string;
    private _pass: string;

    static transport: Transporter<SMTPTransport.SentMessageInfo>;
    constructor(host: string, port: string, user: string, pass: string) {
        this._host = host;
        this._port = port;
        this._user = user;
        this._pass = pass;
    }

    createTransport(){
        if(TransportCreator.transport){
            return;
        }

        const smtpConfig = {
            host: this._host,
            port: this._port,
            auth: {
                user: this._user,
                pass: this._pass,
            }
        }
        // @ts-ignore
        TransportCreator.transport = createTransport(smtpConfig)
        console.log("Mail TRANSPORT: created")
    }

    verify(){
        TransportCreator.transport.verify((err) => {
            if(err) console.log("NODEMAILER: ",err);
        })
    }
}