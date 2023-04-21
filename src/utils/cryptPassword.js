import bcrypt from 'bcrypt'

const createHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPass = bcrypt.hashSync(password, salt)
    return encryptedPass;
}

const isValidPass = (user, password) => {
    const response = bcrypt.compareSync(password, user.password)
    return response;
}

export{
    createHash,
    isValidPass
}