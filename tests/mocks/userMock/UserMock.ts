import { AuthenticationData } from "../../../src/models/AuthenticationData"
import { User } from "../../../src/models/User"

export const userMock = new User( 
    "mocked_id" as any,
    "Paulo",
    "paulo@gmail.com",
    "paulo123",
    "12345678910",
    "Administrator"
)
export const userMock2 = new User(
    "id_mockado" as any,
    "flavio",
    "flavio@lab.com",
    "flavio123",
    "01987654321",
    "Normal"
)