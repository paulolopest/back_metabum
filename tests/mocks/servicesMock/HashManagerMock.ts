export class HashManagerMock {
    generateHash = async(password: string) => {
        return "mocked_hash"
    }

    compareHash = async (password: string, cypherPassword: string): Promise<boolean> => {
        return password === cypherPassword
    }
}