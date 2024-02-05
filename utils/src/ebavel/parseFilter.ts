import { Compiler, Token } from "@ebavel/bnf";

const compiler = new Compiler();

const Quote = (s: string) => JSON.stringify(s)

compiler.AddLanguage(`
    <SYNTAX> ::= <conditionExpression>
    <conditionExpression> ::= <or-expression>
    <or-expression> ::= <and-expression> | <and-expression> <or-operator> <conditionExpression>
    <and-expression> ::= <compare-expression> | <compare-expression> <and-operator> <conditionExpression>
    <compare-expression> ::= <LeftValue> <OWSP> <comparator> <OWSP> <RightValue>
    <LeftValue> ::= <Value> | <LeftField>
    <RightValue> ::= <Value> | <RightField>
    <Value> ::= <String> | NUMBER
    <comparator> ::= "=" | "<" | "<=" | ">" | ">=" | "<>"
    <or-operator> ::= "or" | "||"
    <and-operator> ::= "and" | "&&"
    <String> ::= <StringWithDoubleQuote> | <StringWithSingleQuote>
    <StringWithDoubleQuote> ::= QUOTE *( ( ESCAPE QUOTE ) | ANYCHAR | StringChar | SQUOTE | AQUOTE| ESCAPE ) QUOTE
    <StringWithSingleQuote> ::= SQUOTE *( ( ESCAPE SQUOTE ) | ANYCHAR | StringChar |QUOTE | AQUOTE | ESCAPE ) SQUOTE
    <StringUntilSingleQuote> ::= <StringChar> | <StringChar> <StringUntilSingleQuote>
    <StringChar> ::= %xa1-ff | ALPHA | NUMBER 
    <OWSP> ::= " " | "\\t" | "\\r" | "\\n"
    <CRLF> ::= "\r\n"
    <LeftField> ::= <Field>
    <RightField> ::= <Field>
    <Field> ::= <NewField> | <OldField>
    <NewField> ::= "FORM[" <FormName> "].FIELD[" <FieldName> "]"
    <OldField> ::= "[" <FieldName> "@" <FormName> "]"
    <FieldName> ::= <IdentifierName>
    <FormName> ::= <IdentifierName>
    <IdentifierName> ::= *( <StringChar> | "_" )
    `, "testLang");

const fnReplaceValue = (token: Token, data: { [key: string]: any }, sectionName: string) => {
    const tokenField = token.Child('Field');
    let newValue;
    if (tokenField) {
        if (tokenField.Child('FormName').value == sectionName) {
            let value = data[tokenField.Child('FieldName').value];

            if (typeof value == 'object') {
                value = Object.keys(value).map(i => value[i]).join(',');
            }
            newValue = Quote(value);
        } else {
            newValue = false
        }
    } else {
        newValue = token.value
    }

    return newValue;
}

const fnReplaceField = (token: Token) => {
    const tokenField = token.Child('Field');
    let newValue = false;
    if (tokenField) {
        newValue = tokenField.Child('FieldName').value
    }

    return newValue;
}

export const parseFilter = (filter: string, sectionName: string, data: { [key: string]: any }) => {
    let newFilter = '';
    compiler.SetRuleEvents({
        conditionExpression(token: Token) {
            newFilter = token.value;
        },
        LeftValue(leftToken: Token) {
            // check first right value
            const rightToken = leftToken.parent.Child("RightValue");

            let newValue = fnReplaceValue(rightToken, data, sectionName);
            if (newValue !== false) {
                rightToken.tokens = [];
                rightToken.SetValue(newValue);

                let newField = fnReplaceField(leftToken)
                if (newField !== false) {
                    leftToken.tokens = [];
                    leftToken.SetValue(newField);
                }

            } else {
                // check left value
                newValue = fnReplaceValue(leftToken, data, sectionName);
                if (newValue !== false) {
                    leftToken.tokens = [];
                    leftToken.SetValue(newValue);

                    let newField = fnReplaceField(rightToken)
                    if (newField !== false) {
                        rightToken.tokens = [];
                        rightToken.SetValue(newField);
                    }
                }
            }
        },
    });

    compiler.ParseScript(filter.trim());

    return newFilter;
}