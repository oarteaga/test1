import { getDateComponent } from "../src/ebavel/utils";

const dateTests = [
    {
        date: '2023-10-30',
        component: 'month',
        valueexpect: [
            10,
            'October'
        ]
    },
    {
        date: '2023-10-30',
        component: 'day',
        valueexpect: [
            30,
            'Monday Thirty'
        ]
    },
    {
        date: '2023-10-30',
        component: 'week',
        valueexpect: [
            44,
            'Fourty four'
        ]
    },
    {
        date: '2023-01-01',
        component: 'week',
        valueexpect: [
            1,
            'One'
        ]
    },
    {
        date: '2023-10-30',
        component: 'year',
        valueexpect: [
            2023,
            'Two thousand twenty three'
        ]
    },
]

describe("Utils functions", () => {
    it("Get Date component", () => {
        dateTests.map(({ date, component, valueexpect }) => {
            expect(getDateComponent(date, component, 'number')).toEqual(valueexpect[0]);
            expect(getDateComponent(date, component, 'text')).toEqual(valueexpect[1]);
        })
    });
});