export const verifyDate = async(validationDate:Date):Promise <boolean> => {
    let today = new Date()
    let informedDate = new Date(validationDate)

    let currentTime = today.getTime()
    let expirationDate = informedDate.getTime()

    const verify = expirationDate < currentTime

    return verify
}

export let today = new Date()