import { Card } from "../../../src/models/Card";
import { today } from "../../../src/services/Date";

export const cardMock = new Card (
    "mocked_id",
    "MasterCard",
    "1234567891098765",
    "123",
    "2030/30/10" as unknown as Date,
    {id: "mocked_userId"}
)