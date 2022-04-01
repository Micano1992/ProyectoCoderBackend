const PORT = process.env.PORT || 8080
const PERS = process.env.PERS || 'firebase'
const firebaseConfig = require('./db/firebase/firebase.config.json')

module.exports = {
    ENV: {
        PORT,
        PERS
    },
    DB_CONFIG: {
        mongodb: {
            uri: 'mongodb://localhost/ecommerce'
        },
        firebase: {
            certification: firebaseConfig
        }
    }

}