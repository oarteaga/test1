export const numtoTxt = function (number: number) {
    const snumber = number.toString()
    var col, num, decimals, aString, result, stringDecimals;

    num = (snumber.indexOf('.') != -1 ? snumber.substr(0, snumber.indexOf('.') + 3) : number);

    decimals = (num.toString().indexOf('.') == -1 ? '' : num.toString().substr(num.toString().indexOf('.') + 1));

    if (decimals.length < 2)
        decimals = decimals + '0';

    aString = numberToText(Math.floor(+num));

    aString = aString.charAt(0).toUpperCase() + aString.slice(1);

    result = aString;

    return result.trim();
}

export const numberToText = function (number: number, translate?: CallableFunction) {
    var fullNumberText = '', aString, numberBlocks, ind1, ind2, aNumberString, numberString,
        str1, str2, str3, sep1, sep2, aTextNumber, index, temp, aMilesSeparatorText;

    var textNumberDictKey;
    if (typeof translate != 'function') {
        translate = function (s: string) {
            return s;
        }
    }

    if (number == 0) {
        return translate('zero');
    }

    function textNumberDict(index: string) {
        if (arrTextNumberDict[index]) {
            return arrTextNumberDict[index];
        }
        return '';
    }

    aString = Math.abs(number).toString();

    numberBlocks = Math.ceil(aString.length / 3);

    ind1 = 0;
    for (var blockIndex = numberBlocks; blockIndex > 0; blockIndex--) {
        ind2 = aString.length - ((blockIndex - 1) * 3);
        //GGonzalez 2020-03-03 #CCGYIN:Se corrigió un error que se presentaba al usar la función Money, que al tener un número de 7 dígitos en un campo numérico al momento de convertir el número a texto salía erróneo ya que uno de los dígitos su valor a texto aparece cortado la última letra, esto sucedia en español y no en Inglés
        aNumberString = aString.substring(ind1, ind2);

        // Get the number of each block of numbers always with 3 characters (001 973  345)

        str1 = str2 = str3 = sep1 = sep2 = aTextNumber = '';

        numberString = aNumberString;

        if (aNumberString.length != 3) {
            for (var i = 0; i < (3 - aNumberString.length); i++) {
                numberString = '0' + numberString;
            }
        }

        // number 100 is an exception

        if (numberString == '100') {
            aTextNumber = textNumberDict(translate('number100'));
        } else {
            // Analyze the first position of the current block

            index = 1;
            //GGonzalez 2022-07-14 V2BCRI#:Función money cambia Idioma al traer su valor desde un campo numérico con la función SUM como DefaultValue.Corregida traduccion a español de los casos >100 < 200 
            textNumberDictKey = index + '_' + (numberString[index - 1] ? numberString[index - 1] : '');
            if (textNumberDictKey == '1_1') {
                str1 = translate(textNumberDict(textNumberDictKey) + ' ' + textNumberDict('separator1'));
                sep1 = '';
            } else {
                str1 = translate(textNumberDict(textNumberDictKey));
                sep1 = textNumberDict(translate('separator1'));
            }
            //@GGonzalez
            // To analyze the second  position of the current block verify before the number cases of 11 - 19
            temp = parseInt(numberString.substr(1, 2));

            if (temp >= 11 && temp <= 19) {
                str2 = translate(textNumberDict(temp.toString()));
            } else {
                index = 2;
                str2 = translate(textNumberDict('2_' + numberString[1]));
                sep2 = textNumberDict(translate('separator2'));

                index = 3;
                str3 = translate(textNumberDict('3_' + numberString[2]));

                if (numberString.at(2) == '0' && (str1 != '' || str2 != '')) {
                    str3 = '';
                }
            }

            // Case of  veintidos - treinta y dos
            if (numberString.at(1) == '2' && str3 != '') {
                aTextNumber = str1;
                if (sep1 != '' && str1 != '') {
                    aTextNumber = aTextNumber + ' ' + sep1;
                }
                aTextNumber = aTextNumber + ' ' + textNumberDict(translate('number20')) + str3;
            } else {
                aTextNumber = str1;
                if (sep1 != '' && str1 != '' && (str2 != '' || str3 != '')) {
                    aTextNumber = aTextNumber + ' ' + sep1;
                }
                if (str2 != '') {
                    aTextNumber = aTextNumber + ' ' + str2;
                }
                if (sep2 != '' && str2 != '' && str3 != '') {
                    aTextNumber = aTextNumber + ' ' + sep2;
                }
                if (str3 != '') {
                    aTextNumber = aTextNumber + ' ' + str3;
                }
            }
        }

        // The block number (blockIndex) tell us the separator for each block (2-thousand  3-million)
        aMilesSeparatorText = translate(textNumberDict('milesSeparator_' + blockIndex));

        //Changes uno - un for espanish if this is necessary  ( veintiuno -> veintiun mil )
        if (numberString.endsWith('1') && numberString.at(1) != '1' && textNumberDict(translate('modificateNumber'))) {
            aTextNumber = aTextNumber.substring(0, aTextNumber.length - 1);
        }

        // plural o singular
        if (parseInt(numberString) == 1 && textNumberDict(translate('modificateNumber')) && blockIndex != 2) {
            aMilesSeparatorText = aMilesSeparatorText.substring(0, aMilesSeparatorText.length - 2);
        }

        aTextNumber = aTextNumber.trim();

        if (aTextNumber) {
            fullNumberText = fullNumberText + aTextNumber + ' ' + aMilesSeparatorText + ' ';
        }

        ind1 = ind2;
    }

    return fullNumberText.trim();
}

const arrTextNumberDict: { [key: string]: string | boolean } = {
    '1_0': ''
    , '1_1': 'one hundred'
    , '1_2': 'two hundred'
    , '1_3': 'three hundred'
    , '1_4': 'four hundred'
    , '1_5': 'five hundred'
    , '1_6': 'six hundred'
    , '1_7': 'seven hundred'
    , '1_8': 'eight hundred'
    , '1_9': 'nine hundred'

    , '2_0': ''
    , '2_1': 'ten'
    , '2_2': 'twenty'
    , '2_3': 'thirty'
    , '2_4': 'fourty'
    , '2_5': 'fifty'
    , '2_6': 'sixty'
    , '2_7': 'seventy'
    , '2_8': 'eighty'
    , '2_9': 'ninety'

    , '3_0': ''
    , '3_1': 'one'
    , '3_2': 'two'
    , '3_3': 'three'
    , '3_4': 'four'
    , '3_5': 'five'
    , '3_6': 'six'
    , '3_7': 'seven'
    , '3_8': 'eight'
    , '3_9': 'nine'

    , '11': 'eleven'
    , '12': 'twelve'
    , '13': 'thirteen'
    , '14': 'fourteen'
    , '15': 'fifteen'
    , '16': 'sixteen'
    , '17': 'seventeen'
    , '18': 'eighteen'
    , '19': 'nineteen'

    , 'milesSeparator_1': ''
    , 'milesSeparator_2': 'thousand'
    , 'milesSeparator_3': 'million'
    , 'milesSeparator_4': 'billion'
    , 'milesSeparator_5': 'trillion'

    , 'separator1': 'and'
    , 'separador1': ''
    , 'separator2': ''
    , 'separador2': 'y'
    , 'number20': 'twenty '
    , 'numero20': 'veinti'
    , 'number100': 'one hundred'
    , 'numero100': 'cien'
    , 'modificateNumber': false
    , 'modificarNumero': true
}