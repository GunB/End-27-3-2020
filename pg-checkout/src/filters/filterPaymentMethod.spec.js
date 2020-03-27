import { filterPaymentMethod } from "./filterPaymentMethod";

describe('Filter::PaymentMethods', () => {
    const userPaymenMethods = {
        "payment_url": "testURL",
        "extra_params": 23424234234,
        "card": {
            "name": "Card",
            "url": "not apply"
        },
        "bank_transfer": {
            "name": "Bank_Transfer",
            "url": "TestUrl"
        },
        "extra_params2": 234242342434,
        "cash": {
            "name": "Cash",
            "url": "TestURL"
        }
    }

    it('Should filter the payment methods based on incoming data', () => {
        const expected = [
            { "name": "Card", "url": "not apply" },
            { "name": "Cash", "url": "TestURL" }
        ]
        expect(filterPaymentMethod(userPaymenMethods)).toEqual(expected)
    })
})