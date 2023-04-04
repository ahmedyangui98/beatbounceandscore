require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const { TOKEN_KEY, FRONTEND_URL } = process.env
const secretorkey = process.env.secretorkey
const mimetypes = require("mime-types")
const fs = require("fs")
const uuid = require("uuid")
const request = require('request').defaults({ encoding: null })
const { euclideanDistance, encryptBiometrics, decryptBiometrics, getInitializationVector } = require("../utils")
const path = require('path')




// app.post('/api/auth/register', cors(corsOptions), async (req, res) => 
exports.Register2 = async (req, res) =>  {

    try {
        const { firstname,lastname, email, password, screenshot, descriptor,gender,birthdate } = req.body

        if (!(firstname &&lastname && email && password && screenshot && descriptor)) {
            return res.status(400).send('Ereur fields is empty')
        }

        if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(400).send('The EMAIL field is not in the standard form.')
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(409).send('User already registered. Please log in.')
        }

        const mime = (screenshot.split(';')[0]).split(':')[1]
        const ext = mimetypes.extension(mime)
        const path = 'uploads/'+uuid.v4()+'.'+ext
        fs.writeFile(path, screenshot.split(',')[1], 'base64', (e) => {
            if (e) {
                console.log(e)
                throw 'Unable to save file.'
            }
        })
        const encryptedUserPassword = await bcrypt.hash(password, 10)
        const iv = getInitializationVector(16)
        const user = await User.create({
            firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
            lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedUserPassword,
            image_src: path,
            init_vector: Buffer.from(iv, 'binary').toString('base64'),
            face_descriptor: encryptBiometrics(descriptor, iv),
            gender: gender,
            birthdate: birthdate,
            image:"1",
            role:"admin"

        })
        console.log({user:user.firstname,user:user.lastname, email: user.email})
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.secretorkey);
        console.log(token)
        return res.status(200).json({
                name: user.firstname,
                name: user.lastname,
                email: user.email,
                screenshot: user.image_src,
                registerPic: screenshot,
                token
            })
    }
    catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
    
}

//app.post('/api/auth/login', cors(corsOptions), async (req, res) => 
exports.Login2 = async (req, res) =>  {
    
    try {
        const { email, password, screenshot, descriptor } = req.body

        if (!(email && password && screenshot && descriptor)) {
            return res.status(400).send('you need to complet all fields.')
        }

        if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(400).send('The EMAIL field is not in the standard form.')
        }

        const users = await User.find({})
        let threshold = 0.5
        let bestMatchUser = {}
        users.forEach(u => {
            if(u.init_vector){
                const iv = Buffer.from(u.init_vector, 'base64')
                const distance = euclideanDistance(descriptor, decryptBiometrics(u.face_descriptor, iv))
                if (distance < threshold) {
                    threshold = distance
                    bestMatchUser = u
                }
            }
            
        })
        console.log({bestMatchUser:bestMatchUser.firstname, threshold})
        if (Object.keys(bestMatchUser).length === 0) {
            return res.status(400).send('It was not possible to associate the IMAGE inserted with the one registered. Insert a new image.')
        }
        if (email !== bestMatchUser.email) {
            return res.status(400).send('EMAIL or PASSWORD provided are incorrect.')
        }

        const userByEmail = await User.findOne({ email })
        if ((await bcrypt.compare(password, bestMatchUser.password)) && (await bcrypt.compare(password, userByEmail.password))) {
            const payload = { id: bestMatchUser._id };
            const token = jwt.sign(payload, process.env.secretorkey);
            

            const image_path = path.join("C:\\Users\\ffsga\\OneDrive\\Bureau\\codeTest\\beatbounceandscore\\backend\\", bestMatchUser.image_src)
            let registerPic = ''
            fs.readFile(image_path, (e,c) => {
                if (e) {
                    console.log(e)
                    throw 'An error occurred with image reading.'
                } else {
                    const mime = mimetypes.contentType(image_path.split('.')[1])
                    registerPic = "data:" + mime + ";base64," + c.toString('base64')
                    return res.status(200).json({
                        firstname: bestMatchUser.firstname,
                        lastname: bestMatchUser.lastname,
                        email: bestMatchUser.email,
                        screenshot: bestMatchUser.image_src,
                        registerPic,
                        loginPic: screenshot,
                        user:bestMatchUser,
                        token:token
                    })
                
                }
            })
            
        } else {
            return res.status(400).send('EMAIL or PASSWORD provided are incorrect.')
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
}

//app.post('/api/auth/logout', cors(corsOptions), auth, (req, res) => 
exports.Logout2 = async (req, res) => {
    // TODO: invalidate token
    return res.status(200).send('Logged out successfully!')
}

//app.post('/api/image/get/from/url', cors(corsOptions), (req, res) => {
exports.ImageGetFromUrl = async (req, res) => {    
    try {
        const { url } = req.body
        if (!(url)) {
            return res.status(400).send('Missing data.')
        }
        request.get(url, (error, response, body) => {
            if (!error && response.statusCode === 200 && response.headers["content-type"].includes('image')) {
                const data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64')
                return res.status(200).json({blob: data})
            } else {
                return res.status(400).send('The URL provided does not match an image.')
            }
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
}


//app.post('/api/image/get/profile/pic', cors(corsOptions), auth, async (req, res) => {
exports.ImageGetProfilePic = async (req, res) => {     
    
    try {
        const { email } = req.body

        if (!(email)) {
            return res.status(400).send('Dati mancanti.')
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(409).send('User not found.')
        }

        const image_path = path.join("C:\\Users\\ffsga\\OneDrive\\Bureau\\codeTest\\beatbounceandscore\\backend\\", user.image_src)
        fs.readFile(image_path, (e,c) => {
            if (e) {
                console.log(e)
                return res.status(500).send(e)
            } else {
                const mime = mimetypes.contentType(image_path.split('.')[1])
                const data = "data:" + mime + ";base64," + c.toString('base64')
                return res.status(200).send({blob: data})
            }
        })
    }
    catch (e) {
        return res.status(500).send(e)
    }
}


