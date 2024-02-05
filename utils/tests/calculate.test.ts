import { Evaluator } from "../src/ebavel/Evaluator";

const model = {
    'FFRMS_1234': 10,
    'FFRMS_5678': 20,
    'FFRMS_DATE': "2023-10-26 10:33:09",
}

const anEvaluator = new Evaluator({
    endpoint: {
        url: 'https://kpionline10.bitam.com/eBavel6_test/api/v1/fbm_bmd_0586/',
        headers: {
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJCSVRBTSJ9.JDhlSCRzWihqKGVmcUlsKGdcZSchYsKhKGooZVxucW1bb25lUUYkOGU2dHMrMiFKYSpkKS9PZC1xOXVzZTR0ckkrZCkuKHQtWzMhLW0rwqFLbS8hLCNadXJlJyMscTJnLGk1IW5kMmQtWyfCoUtpSyFLZSpkKS4obClhSGxiSDhoXWQ5ZCg2KHQtZTUjS2krwqEqdS8hLCMrwqEtWzh6ck1IZCkuKGg5ZSd0cmEpaW9sN2pvaSxpOWUraTknLGhvJkxocnA5aClpKWhdcEt0OcKhNnRyaDhpLF9MdXJ0SWpddSp0OXRMaUppKGg5JkxpKVsqaWJfOXRvbE1pOGVRJWxl.`
        }
    },
    form: 'FRM_ABC',
    model,
})

const fetch = jest.fn(async () =>
    Promise.resolve({ json: async () => Promise.resolve({}) })
) as jest.Mock;

global.fetch = fetch


const tests: [string, any][] = [
    [
        `getValue('[FFRMS_80BCC642@FRM_6B22EA87]', '[createdDate_FRM_6B22EA87@FRM_6B22EA87] = FORM[FRM_ABC].FIELD[FFRMS_DATE]')`,
        null
    ],
    [
        `concat(getValue('[FFRMS_80BCC642@FRM_6B22EA87]', '[createdDate_FRM_6B22EA87@FRM_6B22EA87] = "2023-10-26 10:33:09"'), '__esto es una prueba')`,
        `__esto es una prueba`
    ],
    [
        `FORM[FRM_ABC].FIELD[FFRMS_1234]`,
        10
    ],
    [
        `if(true and FALSE,'verdadero','falso')`,
        `falso`
    ],
    [
        `if(true or true,'verdadero','falso')`,
        `verdadero`
    ],
    [
        `[FFRMS_1234@FRM_ABC]+[FFRMS_5678@FRM_ABC]`,
        30
    ],
    [
        `dateComponent("2023-10-26 10:33:09", 'month', 'text')`,
        `October`
    ],
    [
        `dateComponent("2023-10-26 10:33:09", 'day', 'text')`,
        `Friday Twenty seven`
    ],
    [
        `left('hola mundo', 3)`,
        `hol`
    ],
    [
        `right('hola mundo', 3)`,
        `ndo`
    ],
    [
        `mid('hola mundo', 3, 6)`,
        `la m`
    ],
    [
        `mid('hola mundo', 3)`,
        `hola mundo`
    ],
    [
        `round(4.432435, 3)`,
        4.432
    ],
    [
        `trim('  hola mundo  ')`,
        `hola mundo`
    ],
    [
        `getMOnth('2012-05-22')`,
        5
    ],
    [
        `getMonth(currentDate())`,
        new Date().getMonth() + 1
    ],
    [
        `week('2022-04-31', 1)`,
        18
    ],
    [
        `week('2022-04-31', 2)`,
        17
    ],
    [
        `Weekdayname('2023-10-31')`,
        'Tuesday'
    ],
    [
        `dateAdd('day', 1, '2023-10-31')`,
        '2023-11-01'
    ],
    [
        `dateAdd('month', '1', '2023-10-31')`,
        '2023-11-30'
    ],
    [
        `dateAdd('year', '1', '2023-10-31')`,
        '2024-10-31'
    ],
    [
        `dateSub('day', 1, '2023-11-01')`,
        '2023-10-31'
    ],
    [
        `dateSub('month', '1', '2023-10-31')`,
        '2023-09-30'
    ],
    [
        `dateSub('year', '1', '2023-10-31')`,
        '2022-10-31'
    ],
];

describe('Calculate values', () => {

    test.each(tests)('Test %s', async (formula: string, expected: any) => {
        const result = await anEvaluator.cal(formula)
        expect(result).toBe(expected);
    });

    fetch.mockRejectedValueOnce(new Error());

    it('Request error', async () => {
        const result = await anEvaluator.cal(`getValue('[FFRMS_80BCC642@FRM_6B22EA87]', '[createdDate_FRM_6B22EA87@FRM_6B22EA87] = "2023-10-26 10:33:09"')`)
        expect(result).toEqual(undefined);
    });

    it('Current datetime', async () => {
        const result = await anEvaluator.cal(`currentTime()`)
        expect(new Date(result).getMinutes()).toEqual(new Date().getMinutes());
    });
});

