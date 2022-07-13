const express = require('express')
const uuid = require('uuid')

const app = express()

app.use(express.json())


const port = 3000
const orders = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }

    request.orderIndex = index
    request.orderId = id

    next()
}

app.get('/orders', (request, response) => {

    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, clienteName, price, status} = request.body

    const pedido = { id: uuid.v4(), order, clienteName, price, status}
    orders.push(pedido)

    return response.json(pedido)
})

app.put('/orders/:id', checkUserId, (request, response) => {
    const {id} = request.params

    const index = request.orderIndex

     request.orderIndex = index

    const {order, clienteName, price, status} = request.body

    const updateOrder = { id, order, clienteName, price, status}

    orders[index] = updateOrder

    return response.json(updateOrder)
})


app.delete('/orders/:id', checkUserId, (request, response) => {
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})


app.patch('/orders/:id', checkUserId, (request, response) => {
    const {id} = request.params
    const {order, clienteName, price, status} = request.body

    const updateOrder = { id, order, clienteName, price, status: 'Pronto' }

    return response.json(updateOrder)
})


app.delete('/orders/:id', checkUserId, (request, response) => {
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})


app.get('/orders', (request, response) => {
    const { id } = request.params
    const findOrder = orders.find(order => order.id === id)

    return response.json(findOrder)
})



app.listen(port, () => {
    console.log(`🚀 server started on port ${port}`)
})
