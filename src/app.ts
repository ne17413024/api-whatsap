import {createBot, createFlow, createProvider, addKeyword, MemoryDB} from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('hola esta es mi api')


const main = async () =>{
    const provider = createProvider(BaileysProvider)
    provider.initHttpServer(3002)
    provider.http.server.post('/send-message', handleCtx((bot, req, res) => {
        const body = req.body
        console.log(body)

        const message = body.mensaje
        const mediaUrl = body.media
        var numero = '52' + '4521216181'
        bot.sendMessage(numero, message, {
            media: mediaUrl
        })
        res.end('esto es del server de polka')
    }))
    await createBot({
        flow: createFlow([flowBienvenida]),
        database:  new MemoryDB(),
        provider
    })
}

main()
