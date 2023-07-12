import { Card } from '../../../src/Models/Card';
import { today } from '../../../src/Utils/Date';

export const cardMock = new Card(
	'mocked_id',
	'MasterCard',
	'1234567891098765',
	'123',
	'2030/30/10' as unknown as Date,
	{ id: 'mocked_userId' }
);
