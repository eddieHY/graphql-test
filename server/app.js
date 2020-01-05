const express = require('express')
const expressGraphql = require('express-graphql') // 中间件
// const schema = require('./schema')
const schema = require('./schema/schema1') // 定义查询语句和类型

const app = express()

app.use('/graphql', expressGraphql({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('now listening for requests on port 3000')
})