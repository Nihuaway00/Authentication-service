import {TransportCreator} from "./TransportCreator";

class EmailService{
    send(to: string, subject: string, text: string){
        if(!TransportCreator.transport){
            console.log("ERROR: mail cannot be sent, because mail transporter hadn`t created")
            return
        }

        const mailConfig = {
            to,
            text,
            subject
        }

        TransportCreator.transport.sendMail(mailConfig, function (err){
            console.log("ERROR with send mail: ", err?.message)
        })
    }

}

export default new EmailService();