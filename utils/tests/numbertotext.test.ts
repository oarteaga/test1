import { numberToText, numtoTxt } from "../src/ebavel/NumberToText";

const numbersTests = [
    {
        number: 0,
        valueexpect: 'Zero'
    },
    {
        number: 19,
        valueexpect: 'Nineteen'
    },
    {
        number: 111,
        valueexpect: 'One hundred and eleven'
    },
    {
        number: 102,
        valueexpect: 'One hundred and two'
    },
    {
        number: 201,
        valueexpect: 'Two hundred and one'
    },
    {
        number: 302,
        valueexpect: 'Three hundred and two'
    },
    {
        number: 322,
        valueexpect: 'Three hundred and twenty two'
    },
    {
        number: 24,
        valueexpect: 'Twenty four'
    },
    {
        number: 1256,
        valueexpect: 'One thousand two hundred and fifty six'
    },
    {
        number: 3123,
        valueexpect: 'Three thousand one hundred and twenty three'
    },
    {
        number: 100,
        valueexpect: 'One hundred'
    },
    {
        number: 12532,
        valueexpect: 'Twelve thousand five hundred and thirty two'
    },
]

describe("numtoTxt functions", () => {
    it("Translate", () => {
        numbersTests.map(({ number, valueexpect }) => {
            expect(numtoTxt(number)).toEqual(valueexpect);
        })
    });
});